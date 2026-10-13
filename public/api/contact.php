<?php
/**
 * REEF Contact Form Handler
 * Receives form submissions, validates input, sends email notification,
 * and returns a JSON response.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://reef.center');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Rate limiting (simple file-based, 5 submissions per IP per hour)
$rateLimitDir = sys_get_temp_dir() . '/reef_ratelimit';
if (!is_dir($rateLimitDir)) {
    mkdir($rateLimitDir, 0755, true);
}
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = $rateLimitDir . '/' . md5($ip) . '.txt';
$now = time();
$maxPerHour = 5;

if (file_exists($rateLimitFile)) {
    $timestamps = array_filter(
        explode("\n", trim(file_get_contents($rateLimitFile))),
        function($ts) use ($now) { return ($now - intval($ts)) < 3600; }
    );
    if (count($timestamps) >= $maxPerHour) {
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'Too many submissions. Please try again later.']);
        exit;
    }
    $timestamps[] = $now;
    file_put_contents($rateLimitFile, implode("\n", $timestamps));
} else {
    file_put_contents($rateLimitFile, $now);
}

// Parse input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    // Try form-encoded fallback
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$institution = trim($input['institution'] ?? '');
$email = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');

// Validate
$errors = [];

if (empty($email)) {
    $errors[] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid email address.';
}

// Simple honeypot check (hidden field)
if (!empty($input['website'] ?? '')) {
    // Bot detected - pretend success
    echo json_encode(['success' => true]);
    exit;
}

// Basic spam content check
$spamPatterns = ['/\bviagra\b/i', '/\bcasino\b/i', '/\bcrypto.*invest/i', '/\bhttp[s]?:\/\/.*\.(ru|cn|tk)\b/i'];
foreach ($spamPatterns as $pattern) {
    if (preg_match($pattern, $message) || preg_match($pattern, $name)) {
        echo json_encode(['success' => true]); // Pretend success for bots
        exit;
    }
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Sanitize for email
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$institution = htmlspecialchars($institution, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Build email
$to = 'gavinturtle2@outlook.com, greg.desrosiers@gmail.com';
$subject = 'REEF Website Inquiry' . ($name ? " from $name" : '');

$body = "New inquiry from the REEF website contact form:\n\n";
$body .= "Name: " . ($name ?: '(not provided)') . "\n";
$body .= "Institution: " . ($institution ?: '(not provided)') . "\n";
$body .= "Email: $email\n";
$body .= "Message:\n" . ($message ?: '(no message)') . "\n";
$body .= "\n---\n";
$body .= "Submitted: " . date('Y-m-d H:i:s T') . "\n";
$body .= "IP: $ip\n";

$headers = "From: noreply@reef.center\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: REEF-Website-Contact\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your inquiry has been sent.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send message. Please email us directly at socials@reef.center.']);
}

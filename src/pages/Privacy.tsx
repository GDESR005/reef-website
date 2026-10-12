import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-[100dvh] pt-28 pb-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: April 2026</p>

        <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            The Roundtable of Entrepreneurship Educators of Florida, Inc. ("REEF," "we," "our," or "us") is committed to protecting the privacy of our members, visitors, and users of our website at reef.center (the "Site").
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide when you use our contact form, including your name, email address, institutional affiliation, and any message content you submit. We do not collect personal information passively or through tracking technologies beyond what is described here.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">How We Use Your Information</h2>
          <p>
            Information submitted through our contact form is used solely to respond to your inquiry, provide information about REEF membership or events, and communicate with you about REEF activities. We do not sell, rent, or share your personal information with third parties for marketing purposes.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Data Retention</h2>
          <p>
            We retain contact form submissions for as long as reasonably necessary to respond to inquiries and maintain records of communications. You may request deletion of your personal information by emailing us at socials@reef.center.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Cookies and Analytics</h2>
          <p>
            This Site does not use cookies for tracking purposes. Our hosting provider may collect standard server logs (IP addresses, browser type, pages visited) for security and operational purposes.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Third-Party Links</h2>
          <p>
            Our Site may contain links to external websites, including member institution websites and social media platforms. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Children's Privacy</h2>
          <p>
            Our Site is directed at higher education professionals and is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:socials@reef.center" className="text-primary hover:underline font-semibold">socials@reef.center</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

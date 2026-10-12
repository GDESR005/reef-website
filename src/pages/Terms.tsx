import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-[100dvh] pt-28 pb-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: April 2026</p>

        <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            Welcome to reef.center, the official website of the Roundtable of Entrepreneurship Educators of Florida, Inc. ("REEF"). By accessing or using this website (the "Site"), you agree to be bound by these Terms of Service.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Use of the Site</h2>
          <p>
            This Site is provided for informational purposes about REEF, its programs, membership, and the Governor's Cup competition. You may use the Site for lawful purposes consistent with these Terms. You agree not to use the Site in any way that could damage, disable, or impair the Site or interfere with any other party's use.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Intellectual Property</h2>
          <p>
            All content on this Site, including text, graphics, logos, images, and software, is the property of REEF or its content suppliers and is protected by applicable intellectual property laws. The REEF name, logo, and "Governor's Cup" are trademarks of REEF. You may not reproduce, distribute, or create derivative works from Site content without our written permission.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Member Institution Logos</h2>
          <p>
            Logos and names of member institutions displayed on this Site are the property of their respective institutions. Their inclusion on this Site represents their membership in REEF and does not imply endorsement of REEF by those institutions beyond their membership participation.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Contact Form Submissions</h2>
          <p>
            By submitting information through our contact form, you consent to REEF receiving and processing that information for the purpose of responding to your inquiry. You represent that the information you provide is accurate and that you have the authority to provide it.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Disclaimer of Warranties</h2>
          <p>
            This Site is provided on an "as is" and "as available" basis. REEF makes no warranties, express or implied, regarding the Site's operation, availability, accuracy, or completeness of content. REEF does not warrant that the Site will be uninterrupted, error-free, or free of harmful components.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, REEF shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Site.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">External Links</h2>
          <p>
            This Site contains links to third-party websites. These links are provided for convenience only. REEF does not endorse or assume responsibility for the content, privacy policies, or practices of any third-party websites.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Changes to These Terms</h2>
          <p>
            REEF reserves the right to update these Terms at any time. Changes will be posted on this page with an updated revision date. Continued use of the Site after changes constitutes acceptance of the revised Terms.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">Contact Us</h2>
          <p>
            Questions about these Terms should be directed to{" "}
            <a href="mailto:socials@reef.center" className="text-primary hover:underline font-semibold">socials@reef.center</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

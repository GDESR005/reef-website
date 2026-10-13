import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Trophy, Users, Globe, Building2, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HighlightsCarousel } from "@/components/HighlightsCarousel";
import heroBgLarge from "@/assets/hero-bg-1408.jpg";
import heroBgSmall from "@/assets/hero-bg-800.jpg";
import cupImg from "@/assets/governors-cup-winners.jpg";
import photoDesrosiers from "@/assets/greg-desrosiers.jpg";
import photoDanielScott from "@/assets/daniel-scott.jpg";
import photoMcDowell from "@/assets/william-mcdowell.jpg";
import photoHeacock from "@/assets/justin-heacock.jpg";
import logoFGCU from "@/assets/fgcu-logo.png";
import logoFSC from "@/assets/members/fsc.jpg";
import logoStetson from "@/assets/members/stetson.svg";
import logoFAU from "@/assets/members/fau.svg";
import logoFIU from "@/assets/members/fiu.svg";
import logoFSU from "@/assets/members/fsu.svg";
import logoUSF from "@/assets/members/usf.svg";
import logoUTampa from "@/assets/members/utampa.png";
import logoJU from "@/assets/members/ju.svg";
import logoRollins from "@/assets/members/rollins.png";
import logoUCF from "@/assets/members/ucf.svg";
import logoSaintLeo from "@/assets/members/saintleo.svg";
import logoERAU from "@/assets/members/erau.svg";
import logoUF from "@/assets/members/uf.svg";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const MEMBERS: { name: string; abbr: string; url: string; bg: string; text: string; logo?: string }[] = [
  { name: "Florida Gulf Coast University", abbr: "FGCU", url: "https://www.fgcu.edu", bg: "#00558C", text: "#ffffff", logo: logoFGCU },
  { name: "Florida Southern College", abbr: "FSC", url: "https://www.flsouthern.edu", bg: "#002D72", text: "#ffffff", logo: logoFSC },
  { name: "Stetson University", abbr: "SU", url: "https://www.stetson.edu", bg: "#006747", text: "#ffffff", logo: logoStetson },
  { name: "Florida Atlantic University", abbr: "FAU", url: "https://www.fau.edu", bg: "#003366", text: "#ffffff", logo: logoFAU },
  { name: "Florida International University", abbr: "FIU", url: "https://www.fiu.edu", bg: "#081E3F", text: "#B6862C", logo: logoFIU },
  { name: "Florida State University", abbr: "FSU", url: "https://www.fsu.edu", bg: "#782F40", text: "#CEB888", logo: logoFSU },
  { name: "University of South Florida", abbr: "USF", url: "https://www.usf.edu", bg: "#006747", text: "#CFC493", logo: logoUSF },
  { name: "University of Tampa", abbr: "UT", url: "https://www.ut.edu", bg: "#7C2529", text: "#ffffff", logo: logoUTampa },
  { name: "Jacksonville University", abbr: "JU", url: "https://www.ju.edu", bg: "#00573F", text: "#C4A35A", logo: logoJU },
  { name: "Rollins College", abbr: "RC", url: "https://www.rollins.edu", bg: "#003865", text: "#C8A956", logo: logoRollins },
  { name: "University of Central Florida", abbr: "UCF", url: "https://www.ucf.edu", bg: "#000000", text: "#FFC904", logo: logoUCF },
  { name: "Saint Leo University", abbr: "SLU", url: "https://www.saintleo.edu", bg: "#006633", text: "#FFD700", logo: logoSaintLeo },
  { name: "Embry-Riddle Aeronautical University", abbr: "ERAU", url: "https://www.erau.edu", bg: "#003087", text: "#F0AB00", logo: logoERAU },
  { name: "University of Florida", abbr: "UF", url: "https://www.ufl.edu", bg: "#0021A5", text: "#FA4616", logo: logoUF },
];

const LEADERSHIP = [
  {
    name: "Dr. Greg Desrosiers, DBA",
    title: "President & Executive Director",
    institution: "Florida Gulf Coast University",
    photo: photoDesrosiers,
  },
  {
    name: "Daniel James Scott, MBA",
    title: "Vice President",
    institution: "Stetson University",
    photo: photoDanielScott,
  },
  {
    name: "Dr. William McDowell, PhD",
    title: "Treasurer",
    institution: "Florida Gulf Coast University",
    photo: photoMcDowell,
  },
  {
    name: "Justin Heacock, MS",
    title: "Past President",
    institution: "Florida Southern College",
    photo: photoHeacock,
  },
];

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      institution: data.get("institution"),
      email: data.get("email"),
      message: data.get("message"),
      website: data.get("website"),
    };
    if (!payload.email) {
      setFormError("Email is required.");
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        setFormSubmitted(true);
      } else {
        setFormError(result.error || result.errors?.join(" ") || "Something went wrong. Please try again.");
      }
    } catch {
      setFormError("Could not connect. Please email us directly at socials@reef.center.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgLarge}
            srcSet={`${heroBgSmall} 800w, ${heroBgLarge} 1408w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-background" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                The Only Statewide Association for Florida's Entrepreneurship Educators
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Empowering the Future of <span className="text-accent">Florida's Innovators</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto font-medium">
                Uniting educators, thought leaders, and students to advance entrepreneurship education across Florida's higher education community.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 bg-accent hover:bg-accent/90 text-white text-lg font-bold rounded-full shadow-[0_0_40px_-10px_rgba(255,107,53,0.5)] transition-all hover:scale-105"
                  onClick={() => scrollTo('#contact')}
                >
                  Join REEF
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 bg-white text-primary hover:bg-white/90 text-lg font-bold rounded-full shadow-lg transition-all hover:scale-105"
                  onClick={() => scrollTo('#governors-cup')}
                >
                  Governor's Cup
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* 2. ABOUT REEF */}
      <section id="about" className="py-24 bg-background relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
                Academic Gravitas Meets Florida Energy
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Founded in 2016 and powerfully revitalized in 2026, the <strong className="text-foreground">Roundtable of Entrepreneurship Educators of Florida (REEF)</strong> serves as a vital connector and convener.
                </p>
                <p>
                  We are the <strong className="text-accent">only statewide professional association</strong> dedicated exclusively to entrepreneurship programs within Florida's colleges and universities. We provide the stage, the network, and the resources to elevate the standard of entrepreneurship education.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <Globe size={24} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Statewide Network</h3>
                  <p className="text-sm text-muted-foreground">Connecting public and private institutional members across Florida.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                    <Building2 size={24} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Institutional Impact</h3>
                  <p className="text-sm text-muted-foreground">Advancing curriculum, sharing resources, and elevating program profiles.</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroBgLarge}
                  srcSet={`${heroBgSmall} 800w, ${heroBgLarge} 1408w`}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  alt="Aerial view of a Florida coastline at sunset"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl max-w-[280px] hidden md:block">
                <div className="text-4xl font-black text-accent mb-2">2026</div>
                <div className="font-bold text-foreground mb-1">Era of Revitalization</div>
                <p className="text-sm text-muted-foreground">Reinstated and reformed under formal board resolution to champion student founders.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. GOVERNOR'S CUP */}
      <section id="governors-cup" className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-video lg:aspect-square">
                <img src={cupImg} alt="FGCU students with the REEF Governor's Cup Best Business Concept trophy" className="w-full h-full object-cover object-[center_25%]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent text-white text-xs font-bold uppercase tracking-wider mb-3">
                    Flagship Event
                  </div>
                  <h3 className="text-2xl font-bold">Showcasing Florida's Best</h3>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-accent" />
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold">Governor's Cup</h2>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="space-y-6 text-lg text-white">
                <p>
                  Inspired by Oklahoma's successful model, the REEF Governor's Cup is the premier statewide student entrepreneurship competition in Florida.
                </p>
                <p>
                  Hosted on a <strong className="text-accent">rotating basis at member institutions</strong> across Florida, this annual event brings competing student teams from universities across the state to pitch their ventures, face expert judging panels, and celebrate the entrepreneurial spirit.
                </p>
              </motion.div>
              
              <motion.ul variants={fadeInUp} className="mt-8 space-y-4">
                {[
                  "Cash prizes and investment opportunities",
                  "Expert feedback from industry leaders",
                  "Statewide networking for student founders",
                  "Showcase of institutional excellence"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-white">{item}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp} className="mt-10">
                <Button asChild className="bg-white text-primary hover:bg-white/90 h-12 px-8 rounded-full font-bold shadow-lg">
                  <a href="#contact">Learn How to Participate</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. MEMBER INSTITUTIONS */}
      <section id="members" className="py-24 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-heading text-4xl font-bold text-foreground mb-4"
            >
              Our Member Institutions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              A powerful coalition of public research universities, private liberal arts colleges, and dedicated entrepreneurship centers shaping the future of Florida.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {MEMBERS.map((member, idx) => (
              <motion.a
                key={member.name}
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="bg-white border border-border p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center gap-3 group"
              >
                <div className="w-full h-20 flex items-center justify-center">
                  {member.logo ? (
                    <img
                      src={member.logo}
                      alt={`${member.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = "none";
                        const fallback = el.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-16 h-16 rounded-xl items-center justify-center font-heading font-black text-lg shrink-0"
                    style={{ backgroundColor: member.bg, color: member.text, display: member.logo ? "none" : "flex" }}
                  >
                    {member.abbr}
                  </div>
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">{member.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP */}
      <section id="leadership" className="py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Board of Directors</h2>
            <p className="text-lg text-muted-foreground">Dedicated leaders driving entrepreneurship education forward.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEADERSHIP.map((leader, i) => (
              <motion.div 
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full mb-6 overflow-hidden border-4 border-background shadow-xl group-hover:border-primary/20 transition-colors">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-1 lg:min-h-14 xl:min-h-0">{leader.name}</h3>
                <p className="text-accent font-medium mb-2">{leader.title}</p>
                <p className="text-sm text-muted-foreground">{leader.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HIGHLIGHTS */}
      <section id="highlights" className="py-24 bg-background overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Highlights</h2>
            <p className="text-lg text-muted-foreground">
              Moments from the 2026 Governor&apos;s Cup at Florida Gulf Coast University.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HighlightsCarousel />
          </motion.div>
        </div>
      </section>

      {/* 7. WHY JOIN / CONTACT */}
      <section id="contact" className="py-24 bg-muted relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-border">
            <div className="grid lg:grid-cols-2">
              
              {/* Value Prop */}
              <div className="p-12 lg:p-16 bg-primary text-white flex flex-col justify-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Elevate Your Program</h2>
                <p className="text-white text-lg mb-10 leading-relaxed">
                  Join the roundtable to shape policy, share curriculum innovations, and secure your students' spot in the Governor's Cup.
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Professional Community</h4>
                      <p className="text-white/90 text-sm">Direct access to program directors and educators state-wide.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Trophy className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Governor's Cup Access</h4>
                      <p className="text-white/90 text-sm">Exclusive eligibility to send student teams to the flagship competition.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Thank You!</h3>
                    <p className="text-muted-foreground">Your message has been sent successfully. We'll get back to you soon at the email you provided.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading text-3xl font-bold text-foreground mb-2">Get Involved</h3>
                    <p className="text-muted-foreground mb-8">Reach out to learn about membership opportunities or event sponsorship.</p>
                    
                    <form className="space-y-5" onSubmit={handleFormSubmit}>
                      {/* Honeypot field: hidden from people, filled in by bots */}
                      <div className="absolute -left-[9999px]" aria-hidden="true">
                        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="contact-name" className="text-sm font-semibold text-foreground">Name</label>
                          <input id="contact-name" name="name" type="text" className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Dr. Jane Smith" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="contact-institution" className="text-sm font-semibold text-foreground">Institution</label>
                          <input id="contact-institution" name="institution" type="text" className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="University Name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-sm font-semibold text-foreground">Email <span className="text-accent">*</span></label>
                        <input id="contact-email" name="email" type="email" required className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="jane@university.edu" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-message" className="text-sm font-semibold text-foreground">Message</label>
                        <textarea id="contact-message" name="message" className="w-full p-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px] resize-none" placeholder="How can we help?" />
                      </div>
                      {formError && (
                        <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
                          {formError}
                        </div>
                      )}
                      <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-md disabled:opacity-60">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                          </>
                        ) : (
                          "Send Inquiry"
                        )}
                      </Button>
                    </form>
                    
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                      Or email directly: <a href="mailto:socials@reef.center" className="text-primary font-semibold hover:underline">socials@reef.center</a>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

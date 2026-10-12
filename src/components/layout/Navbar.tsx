import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import reefLogoPath from "@/assets/reef-logo.png";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Governor's Cup", href: "#governors-cup" },
  { name: "Members", href: "#members" },
  { name: "Leadership", href: "#leadership" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-50 relative">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm flex items-center justify-center">
              <img
                src={reefLogoPath}
                alt="REEF Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span
              className={`font-heading font-bold text-xl tracking-tight ${
                isScrolled ? "text-primary" : "text-primary md:text-white"
              }`}
            >
              REEF
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isScrolled ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Button
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-6"
              asChild
            >
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Join REEF</a>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden z-50 relative p-2 -mr-2 ${
              isScrolled || mobileMenuOpen ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-6 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 text-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-heading font-semibold text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-8">
            <Button
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold rounded-full"
              asChild
            >
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Join REEF Today</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

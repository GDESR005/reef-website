import { Link } from "wouter";
import { MapPin, Mail, Instagram, Linkedin } from "lucide-react";
import reefLogoPath from "@/assets/reef-logo-borderless.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={reefLogoPath}
                    alt="REEF Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              <span className="font-heading font-bold text-sm leading-tight tracking-tight text-white max-w-[180px]">
                Roundtable of Entrepreneurship Educators of Florida
              </span>
            </div>
            <p className="text-white/90 text-sm mb-6 leading-relaxed">
              A Florida Not-For-Profit Corporation.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/reefflorida" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/reefcenter" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-white/90 hover:text-white transition-colors">About REEF</a></li>
              <li><a href="#governors-cup" className="text-white/90 hover:text-white transition-colors">Governor's Cup</a></li>
              <li><a href="#members" className="text-white/90 hover:text-white transition-colors">Member Institutions</a></li>
              <li><a href="#leadership" className="text-white/90 hover:text-white transition-colors">Leadership</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/90">
                <MapPin className="mt-1 shrink-0 text-accent" size={20} />
                <span className="leading-relaxed">
                  Daveler and Kauanui School of Entrepreneurship<br/>
                  Lucas Hall 126<br/>
                  10501 FGCU Boulevard South<br/>
                  Fort Myers, FL 33965
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <Mail className="shrink-0 text-accent" size={20} />
                <a href="mailto:socials@reef.center" className="hover:text-white transition-colors">socials@reef.center</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/80 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Roundtable of Entrepreneurship
            Educators of Florida Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

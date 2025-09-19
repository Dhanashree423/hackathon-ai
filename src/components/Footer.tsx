import { Mail, Github, Twitter, Heart } from "lucide-react";
import FloatingDecor from "@/components/FloatingDecor";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative mt-16 border-t border-border bg-card/95 backdrop-blur-sm overflow-hidden">
      {/* subtle floating shapes behind content */}
      <FloatingDecor />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">Campus Lost & Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Reuniting our campus with their belongings. Report, browse, and help each other out.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollTo("items")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" /> support@campuslostfound.example
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Connect</h4>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="#"
                className="group inline-flex items-center justify-center h-10 w-10 rounded-md border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              </a>
              <a
                href="#"
                className="group inline-flex items-center justify-center h-10 w-10 rounded-md border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">© {year} Campus Lost & Found. All rights reserved.</p>
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-warning" /> for our community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

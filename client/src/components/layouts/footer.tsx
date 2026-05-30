import { Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import LogoIcon from "../ui/icons/logo-icon";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "API", href: "/docs/api" },
    { label: "Integrations", href: "/integrations" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
    { label: "Support", href: "/support" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <LogoIcon className="h-6 w-6 text-foreground" />
              <span className="text-lg font-semibold">Blogify</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI-powered blog platform for modern content teams. Build,
              manage, and scale your content.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Blogify. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="https://twitter.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              to="https://github.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

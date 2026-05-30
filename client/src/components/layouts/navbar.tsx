import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { X, Menu } from "lucide-react";
import { useAuthStore } from "../../lib/store/auth";
import LogoIcon from "../ui/icons/logo-icon";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <LogoIcon className="h-6 w-6 text-foreground" />
          <span className="text-lg font-semibold">Blogify</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            to="/docs"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Documentation
          </Link>
          <Link
            to="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
        </div>

        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/auth/signin">
              <Button
                variant="ghost"
                size="md"
                className="text-muted-foreground hover:text-foreground"
              >
                Log in
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button
                size="md"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Get Started
              </Button>
            </Link>
          </div>
        )}

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-4 p-4">
            <Link to="/pricing" className="text-sm text-muted-foreground">
              Pricing
            </Link>
            <Link to="/docs" className="text-sm text-muted-foreground">
              Documentation
            </Link>
            <Link to="/blog" className="text-sm text-muted-foreground">
              Blog
            </Link>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex flex-col gap-2 pt-4">
                <Link to="/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-foreground text-background">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

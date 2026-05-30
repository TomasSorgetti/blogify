import { Link } from "react-router-dom";
import { CTABackground } from "./cta-background";
import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="border-t border-border py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-background/30 p-12 lg:p-24">
          <CTABackground />

          <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 z-0 h-64 w-64 rounded-full bg-accent/5 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to transform your content workflow?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
              Join thousands of content teams shipping faster with Blogify.
              Start free, no credit card required.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth/signup">
                <Button
                  size="lg"
                  className="bg-foreground px-8 py-6 text-base text-background hover:bg-foreground/90"
                >
                  Start building for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base bg-transparent"
                >
                  Read the docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import Badge from "../../ui/badge";
import { Button } from "../../ui/button";
import SparklesIcon from "../../ui/icons/sparkles-icon";
import { HeroBackground } from "./background";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <HeroBackground />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>
            <SparklesIcon className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">
              AI-powered content platform
            </span>
          </Badge>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The fastest and most powerful platform for building blogs
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Create, manage, and scale your content with AI-powered tools,
            collaborative workspaces, and a powerful API. Built for teams who
            ship.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/auth/signup">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Start building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View pricing
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-10">
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Trusted by content teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {[
              "TechCorp",
              "StartupHQ",
              "MediaFlow",
              "ContentLab",
              "DigitalFirst",
            ].map((company) => (
              <span
                key={company}
                className="text-lg font-semibold text-muted-foreground/60"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

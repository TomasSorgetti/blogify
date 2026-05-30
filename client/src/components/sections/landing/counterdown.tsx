import { useState, useEffect } from "react";
import { ArrowRight, Bell } from "lucide-react";
import { Button } from "../../ui/button";
import { AnimatedRocket } from "./animated-rocket";

export function Counterdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background via-accent/5 to-background" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="lowcode-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lowcode-grid)" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-6">
                <Bell className="w-4 h-4" />
                Coming Soon
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Low-Code Integrations
              </h2>

              <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                Connect your favorite tools without writing a single line of
                code. Zapier, Make, and native integrations launching soon.
              </p>

              <div className="flex justify-center lg:justify-start gap-3 md:gap-4 mb-8">
                {timeUnits.map((unit, index) => (
                  <div
                    key={unit.label}
                    className="flex items-center gap-3 md:gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-background border border-border rounded-xl flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-2xl md:text-3xl font-bold font-mono">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                        {unit.label}
                      </span>
                    </div>
                    {index < timeUnits.length - 1 && (
                      <span className="text-2xl text-muted-foreground font-bold mb-6">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  variant="none"
                  className="bg-accent hover:bg-accent/90"
                >
                  Get Early Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Notify Me
                  <Bell className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="shrink-0">
              <AnimatedRocket />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Upcoming integrations
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {["Zapier", "Make", "Notion", "Slack", "Discord", "Webhooks"].map(
                (name) => (
                  <div
                    key={name}
                    className="px-4 py-2 bg-muted/50 rounded-lg text-sm font-medium text-muted-foreground"
                  >
                    {name}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

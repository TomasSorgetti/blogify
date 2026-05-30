import { Button } from "../button";
import { PricingCardBackground } from "./pricing-bg";
import { CheckIcon } from "lucide-react";

type Props = {
  price: number;
  savings: number;
  isAnnual: boolean;
  name: string;
  description: string;
  features: string[];
  popular?: boolean;
  variant: "free" | "pro" | "premium";
  monthlyPrice: number;
  annualPrice: number;
  disabled?: boolean;
  registered?: boolean;
  onAction?: () => void;
};

export default function PricingCard({
  price,
  savings,
  name,
  description,
  features,
  popular,
  variant,
  isAnnual,
  monthlyPrice,
  annualPrice,
  disabled,
  registered,
  onAction,
}: Props) {
  const ctaText = registered
    ? "Go to dashboard"
    : disabled
      ? "Coming soon"
      : "Get started";

  return (
    <article
      key={name}
      className={`group relative rounded-2xl border backdrop-blur-sm transition-all duration-300 h-full ${
        popular
          ? "border-accent/50 bg-linear-to-br from-card to-card/50 shadow-xl shadow-accent/10 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1"
          : "border-border/50 bg-card/40 hover:border-accent/30 hover:bg-card/60 hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      <PricingCardBackground variant={variant} />

      <div className="relative z-10 flex min-h-[480px] flex-col p-8 lg:p-10">
        {popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-accent to-accent/80 px-4 py-1.5 text-xs font-semibold text-accent-foreground shadow-lg">
            Most Popular
          </div>
        )}
        <div className="mb-8">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold">${price}</span>
            <span className="text-muted-foreground">
              {price === 0 ? "Free" : `/${isAnnual ? "year" : "month"}`}
            </span>
          </div>
          {isAnnual && savings > 0 && (
            <p className="mt-3 text-sm text-accent">
              Save ${monthlyPrice * 12 - annualPrice} per year ({savings}%)
            </p>
          )}
        </div>

        <ul className="mb-8 flex-1 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
                <CheckIcon className="h-3 w-3 text-accent" />
              </div>
              <span className="text-foreground/90">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            onClick={onAction}
            className={`w-full py-6 text-base font-semibold transition-all ${
              popular
                ? "bg-linear-to-r from-accent to-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/30"
                : "border-accent/30 hover:border-accent hover:bg-accent/5"
            }`}
            variant={popular ? "default" : "outline"}
            disabled={disabled}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </article>
  );
}

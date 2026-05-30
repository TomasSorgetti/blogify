import { PRICING_FAQ } from "../../../lib/constants/pricing";

export function FAQSection() {
  return (
    <div className="mt-24">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Frequently asked questions
      </h2>
      <div className="mx-auto grid max-w-3xl gap-6">
        {PRICING_FAQ.map((faq) => (
          <div
            key={faq.q}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h3 className="font-semibold">{faq.q}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

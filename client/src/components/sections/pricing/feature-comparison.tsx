import { CheckIcon, XIcon } from "lucide-react";
import { FEATURE_COMPARISON } from "../../../lib/constants/pricing";

export function FeatureComparison() {
  return (
    <div className="mt-24">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Compare all features
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 text-left text-sm font-medium text-muted-foreground">
                Feature
              </th>
              <th className="px-4 py-4 text-center text-sm font-medium">Free</th>
              <th className="px-4 py-4 text-center text-sm font-medium">Pro</th>
              <th className="px-4 py-4 text-center text-sm font-medium">
                Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-border">
                <td className="py-4 text-sm">{row.feature}</td>
                {[row.free, row.pro, row.premium].map((value, i) => (
                  <td key={i} className="px-4 py-4 text-center text-sm">
                    {typeof value === "boolean" ? (
                      value ? (
                        <CheckIcon className="mx-auto h-4 w-4 text-accent" />
                      ) : (
                        <XIcon className="mx-auto h-4 w-4 text-muted-foreground/30" />
                      )
                    ) : (
                      <span className="text-muted-foreground">{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

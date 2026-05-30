const stats = [
  { value: "50K+", label: "Articles published", company: "ContentLab" },
  { value: "99.9%", label: "Uptime SLA", company: "Infrastructure" },
  { value: "3x", label: "Faster publishing", company: "TechCorp" },
  { value: "10M+", label: "API requests/mo", company: "Enterprise" },
];

export default function Stats() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map((stat) => (
            <li key={stat.label} className="px-6 py-10 text-center sm:py-12">
              <p className="text-3xl font-bold text-foreground lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground/60">
                {stat.company}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

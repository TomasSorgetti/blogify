import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import type { IStats } from "../../../lib/store/stats";

interface StatsDashboardProps {
  data: IStats | null;
  loading: boolean;
}

export function StatsDashboard({ data, loading }: StatsDashboardProps) {
  const viewsData = data?.history || [];
  
  // Dummy api data for now since we don't have a time-series for it yet
  const apiData = [
    { name: "Mon", requests: 0 },
    { name: "Tue", requests: 0 },
    { name: "Wed", requests: 0 },
    { name: "Thu", requests: 0 },
    { name: "Fri", requests: 0 },
    { name: "Sat", requests: 0 },
    { name: "Sun", requests: 0 },
  ];

  const topArticles = data?.topArticles || [];

  if (loading && !data) {
    return <div className="h-96 flex items-center justify-center text-muted-foreground">Loading statistics...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold">Article Views (Active Period)</h3>
          <div className="h-64">
            {viewsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="oklch(0.7 0.15 200)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.7 0.15 200)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                  <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.13 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="oklch(0.7 0.15 200)"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No data available for this period</div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold">API Requests</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.13 0 0)",
                    border: "1px solid oklch(0.22 0 0)",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="requests"
                  fill="oklch(0.65 0.18 150)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold">Top Performing Articles</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Articles ranked by total views
          </p>
        </div>
        <div className="divide-y divide-border">
          {topArticles.length > 0 ? (
            topArticles.map((article: any, i: number) => (
              <div
                key={article.title + i}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                    {i + 1}
                  </span>
                  <span className="font-medium">{article.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">
                    {article.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">No traffic recorded yet</div>
          )}
        </div>
      </div>
    </div>
  );
}


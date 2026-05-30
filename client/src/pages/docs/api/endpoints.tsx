import { Code } from "lucide-react";
import { CodeBlock } from "../../../components/sections/docs/code-block";
import DocsLayout from "../../../components/layouts/docs-layout";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/articles",
    description: "List all articles",
    params: ["workspace", "status", "limit", "offset"],
  },
  {
    method: "POST",
    path: "/api/v1/articles",
    description: "Create a new article",
    params: ["title", "content", "tags", "status"],
  },
  {
    method: "GET",
    path: "/api/v1/articles/:id",
    description: "Get article by ID",
    params: [],
  },
  {
    method: "PATCH",
    path: "/api/v1/articles/:id",
    description: "Update an article",
    params: ["title", "content", "tags", "status"],
  },
  {
    method: "DELETE",
    path: "/api/v1/articles/:id",
    description: "Delete an article",
    params: [],
  },
  {
    method: "POST",
    path: "/api/v1/articles/:id/publish",
    description: "Publish an article",
    params: [],
  },
];

const exampleRequest = `curl -X POST https://api.blogify.io/v1/articles \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My New Article",
    "content": "Article content here...",
    "tags": ["tutorial"],
    "status": "draft"
  }'`;

const exampleResponse = `{
  "id": "art_123abc",
  "title": "My New Article",
  "slug": "my-new-article",
  "content": "Article content here...",
  "tags": ["tutorial"],
  "status": "draft",
  "author": {
    "id": "usr_456def",
    "name": "John Doe"
  },
  "createdAt": "2026-01-09T10:00:00Z",
  "updatedAt": "2026-01-09T10:00:00Z"
}`;

export default function EndpointsPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-accent text-sm mb-4">
            <Code className="w-4 h-4" />
            API Reference
          </div>
          <h1 className="text-4xl font-bold mb-4">API Endpoints</h1>
          <p className="text-xl text-muted-foreground">
            Complete reference for all available API endpoints.
          </p>
        </div>

        <div className="mb-12 p-4 rounded-lg border border-border bg-muted/30">
          <p className="text-sm text-muted-foreground mb-1">Base URL</p>
          <code className="text-accent font-mono">
            https://api.blogify.io/v1
          </code>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Articles</h2>
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 text-sm font-semibold">
                    Method
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">
                    Endpoint
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {endpoints.map((endpoint, index) => (
                  <tr
                    key={index}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                          endpoint.method === "GET"
                            ? "bg-green-500/10 text-green-500"
                            : endpoint.method === "POST"
                            ? "bg-blue-500/10 text-blue-500"
                            : endpoint.method === "PATCH"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono text-foreground">
                        {endpoint.path}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {endpoint.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Example Request</h2>
          <CodeBlock
            code={exampleRequest}
            language="bash"
            filename="Create Article"
          />

          <h2 className="text-2xl font-bold">Example Response</h2>
          <CodeBlock
            code={exampleResponse}
            language="json"
            filename="Response (201 Created)"
          />
        </div>
      </div>
    </DocsLayout>
  );
}

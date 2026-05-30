import { Link } from "react-router-dom";
import { CodeBlock } from "../../components/sections/docs/code-block";
import { ArrowRight, Book, Zap, Code, Sparkles } from "lucide-react";
import DocsLayout from "../../components/layouts/docs-layout";

const quickLinks = [
  {
    title: "Quick Start",
    description: "Get up and running in under 5 minutes",
    href: "/docs/quickstart",
    icon: Zap,
  },
  {
    title: "API Reference",
    description: "Complete API documentation",
    href: "/docs/api/endpoints",
    icon: Code,
  },
  {
    title: "AI Features",
    description: "Leverage AI for better content",
    href: "/docs/ai/writing",
    icon: Sparkles,
  },
];

const fetchSnippets = [
  {
    label: "Javascript",
    language: "javascript",
    code: `const res = await fetch('https://api.blogify.com/fetch/articles', {
  headers: { 'X-API-KEY': 'YOUR_KEY' }
});`
  },
  {
    label: "React",
    language: "tsx",
    code: `const { data } = await fetch('https://api.blogify.com/fetch/articles', {
  headers: { 'X-API-KEY': 'YOUR_KEY' }
}).then(r => r.json());`
  },
  {
    label: "Astro",
    language: "astro",
    code: `---
const res = await fetch('https://api.blogify.com/fetch/articles', {
  headers: { 'X-API-KEY': import.meta.env.BLOGIFY_KEY }
});
---`
  }
];

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-accent text-sm mb-4">
            <Book className="w-4 h-4" />
            Documentation
          </div>
          <h1 className="text-4xl font-bold mb-4">Introduction</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to Blogify documentation. Learn how to integrate AI-powered
            blogging into your applications via our Headless API.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                className="group p-4 rounded-xl border border-border bg-card hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <Icon className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-12 mb-4">What is Blogify?</h2>
          <p className="text-muted-foreground mb-6">
            Blogify is a modern, AI-powered blog platform designed for
            developers. It provides a Headless CMS solution where you manage content 
            in our dashboard and fetch it via API to render on any frontend.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Key Features</h2>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>
                <strong className="text-foreground">
                  Headless First
                </strong>{" "}
                - Clean JSON responses ready for any device or framework.
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>
                <strong className="text-foreground">
                  Real-time Analytics
                </strong>{" "}
                - Built-in tracking for views, requests and custom engagement events.
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>
                <strong className="text-foreground">AI Writing Assistant</strong> - Optimize 
                your creation process with state-of-the-art LLMs.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Quick Example</h2>
          <p className="text-muted-foreground mb-4">
            Fetch your content using standard HTTP requests:
          </p>
          <CodeBlock snippets={fetchSnippets} />

          <div className="mt-12 p-6 rounded-xl border border-border bg-accent/5">
            <h3 className="text-lg font-semibold mb-2">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground mb-4">
              Follow our quick start guide to connect your first app in under
              5 minutes.
            </p>
            <Link
              to="/docs/quickstart"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              Quick Start Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}


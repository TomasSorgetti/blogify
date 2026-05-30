import { ArrowRight, Zap, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../components/sections/docs/code-block";
import DocsLayout from "../../components/layouts/docs-layout";

const steps = [
  {
    title: "Create an account",
    description: "Sign up for a free Blogify account to get started.",
  },
  {
    title: "Get your API key",
    description: "Generate an API key from your dashboard settings.",
  },
  {
    title: "Connect your frontend",
    description: "Fetch your articles using our Headless API.",
  },
  {
    title: "Track engagement",
    description: "Send analytics events to see how your readers interact.",
  },
];

const fetchArticlesSnippets = [
  {
    label: "Javascript",
    language: "javascript",
    code: `const response = await fetch('https://api.blogify.com/fetch/articles', {
  headers: {
    'X-API-KEY': 'your_api_key_here'
  }
});
const { data } = await response.json();
console.log(data.items);`
  },
  {
    label: "React",
    language: "tsx",
    code: `import { useEffect, useState } from 'react';

export function BlogList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://api.blogify.com/fetch/articles', {
      headers: { 'X-API-KEY': 'your_api_key_here' }
    })
    .then(res => res.json())
    .then(json => setArticles(json.data.items));
  }, []);

  return (
    <ul>
      {articles.map(article => (
        <li key={article.slug}>{article.title}</li>
      ))}
    </ul>
  );
}`
  },
  {
    label: "Next.js",
    language: "tsx",
    code: `// Server Component
export default async function Page() {
  const res = await fetch('https://api.blogify.com/fetch/articles', {
    headers: { 'X-API-KEY': process.env.BLOGIFY_KEY },
    next: { revalidate: 3600 }
  });
  const { data } = await res.json();

  return (
    <div>
      {data.items.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </article>
      ))}
    </div>
  );
}`
  },
  {
    label: "Astro",
    language: "astro",
    code: `---
// index.astro
const res = await fetch('https://api.blogify.com/fetch/articles', {
  headers: { 'X-API-KEY': import.meta.env.BLOGIFY_KEY }
});
const { data } = await res.json();
---

<ul>
  {data.items.map(post => (
    <li>{post.title}</li>
  ))}
</ul>`
  },
  {
    label: "Vue",
    language: "vue",
    code: `<script setup>
import { onMounted, ref } from 'vue'

const articles = ref([])

onMounted(async () => {
  const res = await fetch('https://api.blogify.com/fetch/articles', {
    headers: { 'X-API-KEY': 'your_api_key' }
  })
  const { data } = await res.json()
  articles.value = data.items
})
</script>

<template>
  <div v-for="post in articles" :key="post.slug">
    {{ post.title }}
  </div>
</template>`
  }
];

const trackEventSnippet = {
  label: "Javascript",
  language: "javascript",
  code: `await fetch('https://api.blogify.com/fetch/analytics/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'your_api_key'
  },
  body: JSON.stringify({
    type: 'READING_TIME',
    articleId: 'article_id_here',
    metadata: { seconds: 120 }
  })
});`
};

export default function QuickStartPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-accent text-sm mb-4">
            <Zap className="w-4 h-4" />
            Getting Started
          </div>
          <h1 className="text-4xl font-bold mb-4">Quick Start</h1>
          <p className="text-xl text-muted-foreground">
            Connect your website to Blogify Headless API in minutes.
          </p>
        </div>

        <div className="mb-12 p-6 rounded-xl border border-border bg-card">
          <ul className="space-y-3">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <span className="font-medium">{step.title}</span>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Create an account</h2>
            <p className="text-muted-foreground mb-4">
              Sign up for a free Blogify account and create your first workspace.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Get your API key</h2>
            <p className="text-muted-foreground mb-4">
              Navigate to{" "}
              <strong className="text-foreground">Settings → API Keys</strong>{" "}
              in your dashboard and generate a key for your workspace.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Connect your frontend</h2>
            <p className="text-muted-foreground mb-4">
              Use our Headless API to fetch your content. Choose your favorite framework:
            </p>
            <CodeBlock snippets={fetchArticlesSnippets} />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. Track Engagement
            </h2>
            <p className="text-muted-foreground mb-4">
              Improve your statistics by sending custom events back to Blogify:
            </p>
            <CodeBlock snippets={[trackEventSnippet]} />
          </section>

          <div className="mt-12 p-6 rounded-xl border border-border bg-accent/5">
            <h3 className="text-lg font-semibold mb-2">Next steps</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/docs/api/endpoints"
                className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
              >
                Full API Reference
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard/stats"
                className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
              >
                View your stats
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}


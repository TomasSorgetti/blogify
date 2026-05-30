import { BlogHeroBackground } from "./bg-hero-background";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden py-16 mt-10 lg:py-24">
      <BlogHeroBackground />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          Content Strategy & Software Management News
        </h1>
        <p className="mx-auto max-w-3xl text-pretty text-lg text-muted-foreground">
          Discover expert tips on content creation, management tools, and SaaS
          updates. Learn how to manage your articles effectively with our latest
          insights.
        </p>
      </div>
    </section>
  );
}

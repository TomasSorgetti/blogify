import { Types } from "mongoose";

export default async function seedArticles(ArticleSchema) {
  const adminId = new Types.ObjectId("69b71bc743bed569c284da48");

  const defaultArticles = [
    {
      title: "Welcome to the Future of Content Management",
      slug: "future-of-content-management",
      content:
        "### Revolutionizing the way you publish\n\nContent management shouldn't be a chore. We built this platform to empower creators and teams to focus on what matters most: **storytelling**. \n\nWith our new suite of tools, you can:\n* Draft articles in a seamless Markdown editor.\n* Manage global subscriptions with a single click.\n* Analyze performance through a real-time dashboard.\n\nStay tuned for more updates!",
      summary:
        "An introduction to our mission and how we're simplifying the digital publishing workflow for modern creators.",
      tags: "Company, Product, Milestones",
      status: "PUBLISHED",
      isFeatured: true,
      author: adminId,
      isGlobal: true,
    },
    {
      title: "5 SEO Strategies to Boost Your Article Rankings",
      slug: "seo-strategies-article-rankings",
      content:
        "### SEO is no longer a mystery\n\nGetting your content found on Google requires a mix of technical precision and quality writing. Our platform automates the heavy lifting—like metadata and sitemaps—but here are 5 tips to go even further:\n\n1. **Focus on User Intent.**\n2. **Optimize your Heading hierarchy (H1, H2, H3).**\n3. **Use descriptive Alt text for images.**\n4. **Improve internal linking.**\n5. **Write for humans first.**",
      summary:
        "Master the basics of SEO with our guide on how to rank higher and reach more readers in 2026.",
      tags: "SEO, Growth, Marketing",
      status: "PUBLISHED",
      author: adminId,
      isGlobal: true,
    },
    {
      title: "Maximizing Revenue with Our Subscription Model",
      slug: "maximize-revenue-subscription-model",
      content:
        '### Content is valuable—monetize it properly\n\nTransitioning from free content to a subscription model can be daunting. We\'ve simplified the process. Our platform handles the recurring billing, so you can focus on providing exclusive value to your members.\n\n> "The key to successful subscriptions is consistent quality."\n\nIn this post, we explore how to price your tiers and keep your churn rate low.',
      summary:
        "A deep dive into setting up and optimizing your content subscriptions for sustainable income.",
      tags: "Monetization, SaaS, Business",
      status: "PUBLISHED",
      author: adminId,
      isGlobal: true,
    },
    {
      title: "The Power of Markdown in Modern Web Design",
      slug: "power-of-markdown-web-design",
      content:
        "### Why Markdown Wins\n\nMarkdown is the bridge between developers and writers. It’s lightweight, portable, and prevents the formatting headaches of traditional 'What You See Is What You Get' editors.\n\nOur platform uses **GitHub Flavored Markdown**, allowing you to include code blocks, tables, and task lists without breaking your site’s design.",
      summary:
        "Why we chose Markdown as our primary editing format and how it benefits your publishing speed.",
      tags: "Development, Design, Productivity",
      status: "PUBLISHED",
      author: adminId,
      isGlobal: true,
    },
    {
      title: "How Artificial Intelligence is Shaping Content Workflows",
      slug: "ai-shaping-content-workflows",
      content:
        "### Collaboration, not replacement\n\nAI is a powerful assistant for content managers. From generating outlines to summarizing long-form pieces, tools like our built-in assistant help you clear writer's block in seconds.\n\nWe believe the best content is **AI-augmented but human-led**. Here's how to find the right balance.",
      summary:
        "Exploring the role of AI in modern content creation and how to use it without losing your brand voice.",
      tags: "AI, Innovation, Tech Trends",
      status: "PUBLISHED",
      isFeatured: true,
      author: adminId,
      isGlobal: true,
    },
    {
      title: "Announcement: Version 2.0 Now Live",
      slug: "version-2-announcement",
      content:
        "### Faster, Sleeker, Better\n\nWe've completely rebuilt our dashboard to provide a more intuitive experience. \n\n**New features include:**\n* **Advanced Analytics:** See exactly where your traffic is coming from.\n* **Dark Mode:** Because we know you work late.\n* **Collaborative Drafting:** Work with your team in real-time.",
      summary:
        "Check out the latest features and performance improvements in our biggest update yet.",
      tags: "Product Updates, News",
      status: "PUBLISHED",
      author: adminId,
      isGlobal: true,
    },
    {
      title: "Why Site Performance Matters for Your Brand",
      slug: "site-performance-brand-impact",
      content:
        "### Speed is a feature\n\nA one-second delay in page load can lead to a 7% reduction in conversions. That’s why we prioritize **Core Web Vitals**. \n\nEvery article you publish on our platform is optimized for speed, ensuring your readers stay engaged and your bounce rate stays low.",
      summary:
        "Understanding the link between fast loading times and your bottom line.",
      tags: "Performance, UX, Web Tech",
      status: "PUBLISHED",
      author: adminId,
      isGlobal: true,
    },
    {
      title: "Securing Your Digital Content Assets",
      slug: "securing-digital-content-assets",
      content:
        "### Your data, protected\n\nSecurity is at the heart of everything we do. From encrypted database backups to secure API endpoints, we ensure that your intellectual property remains yours.\n\nIn this article, we break down our security architecture and what we do to prevent data leaks.",
      summary:
        "A look into the security measures we take to keep your articles and subscriber data safe.",
      tags: "Security, Data, Company",
      status: "PUBLISHED",
      author: adminId,
      isGlobal: true,
    },
    {
      title: "A Guide to High-Converting Landing Pages",
      slug: "high-converting-landing-pages",
      content:
        "### Converting visitors into fans\n\nYour blog is a funnel. To move readers toward a subscription, your layout needs to be clear and persuasive. \n\n**Key elements:**\n1. A compelling value proposition.\n2. Clear Call-to-Action (CTA) buttons.\n3. Social proof and testimonials.\n4. Minimal friction during checkout.",
      summary:
        "Tips and tricks on designing content pages that drive user actions and sales.",
      tags: "Marketing, Conversion, Design",
      status: "PUBLISHED",
      author: adminId,
      isGlobal: true,
    },
    {
      title: "Scaling Your Content Team: Best Practices",
      slug: "scaling-content-team-best-practices",
      content:
        "### Growing together\n\nAs your business grows, your content needs will too. Transitioning from a solo creator to a team requires structured workflows and clear roles.\n\nOur platform’s team management features allow you to assign roles—Editor, Contributor, or Admin—making collaboration seamless.",
      summary:
        "Learn how to manage multiple authors and streamline your editorial process as you grow.",
      tags: "Management, Teams, Collaboration",
      status: "PUBLISHED",
      author: adminId,
      isGlobal: true,
    },
  ];

  for (const article of defaultArticles) {
    const exists = await ArticleSchema.findOne({ slug: article.slug });
    if (!exists) {
      await ArticleSchema.create(article);
      console.log(`Article '${article.title}' seeded`);
    }
  }
}

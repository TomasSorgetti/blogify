type Form = {
  title: string;
  slug: string;
  summary: string;
  content: string;
};

export const articleValidators = {
  title: (value: string) => {
    if (!value.trim()) return "Title is required";
    if (value.length < 5) return "Title must be at least 5 characters";
    if (value.length > 100) return "Title must be under 100 characters";
    return "";
  },

  slug: (value: string) => {
    if (!value.trim()) return "Slug is required";
    const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!regex.test(value))
      return "Slug can only contain lowercase, numbers and hyphens";
    return "";
  },

  summary: (value: string) => {
    if (!value.trim()) return "Summary is required";
    if (value.length < 20) return "Summary must be at least 20 characters";
    if (value.length > 300) return "Summary must be under 300 characters";
    return "";
  },

  content: (value: string) => {
    const text = value.replace(/<[^>]*>/g, "").trim();
    if (!text) return "Content is required";
    if (text.length < 20)
      return "Content must be at least 20 characters of readable text";
    return "";
  },
};

export const validateArticleForm = (form: Form) => {
  const errors = {
    title: articleValidators.title(form.title),
    slug: articleValidators.slug(form.slug),
    summary: articleValidators.summary(form.summary),
    content: articleValidators.content(form.content),
  };

  const isValid = !Object.values(errors).some((msg) => msg !== "");

  return { isValid, errors };
};

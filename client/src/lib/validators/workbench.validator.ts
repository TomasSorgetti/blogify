type Form = {
  name: string;
  description: string;
};

export const workbenchValidators = {
  name: (value: string) => {
    if (!value.trim()) return "Name is required";
    if (value.length < 3) return "Name must be at least 3 characters";
    if (value.length > 40) return "Name must be under 40 characters";
    return "";
  },

  description: (value: string) => {
    if (!value.trim()) return "Description is required";
    if (value.length < 10) return "Description must be at least 10 characters";
    if (value.length > 200) return "Description must be under 200 characters";
    return "";
  },
};

export const validateWorkbenchForm = (form: Form) => {
  const errors = {
    name: workbenchValidators.name(form.name),
    description: workbenchValidators.description(form.description),
  };

  const isValid = !Object.values(errors).some((msg) => msg !== "");

  return { isValid, errors };
};

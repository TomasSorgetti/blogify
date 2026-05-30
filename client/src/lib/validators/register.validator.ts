type Form = {
  username: string;
  email: string;
  password: string;
};

export const registerValidators = {
  username: (value: string) => {
    if (!value.trim()) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 20) return "Username must be under 20 characters";
    return "";
  },

  email: (value: string) => {
    if (!value.trim()) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Invalid email format";
    return "";
  },

  password: (value: string) => {
    if (!value.trim()) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  },
};

export const validateRegisterForm = (form: Form) => {
  const errors = {
    username: registerValidators.username(form.username),
    email: registerValidators.email(form.email),
    password: registerValidators.password(form.password),
  };

  const isValid = !Object.values(errors).some((msg) => msg !== "");

  return { isValid, errors };
};

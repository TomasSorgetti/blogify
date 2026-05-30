import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import CustomInput from "../../components/ui/forms/custom-input";
import CustomLabel from "../../components/ui/forms/custom-label";
import MainLayout from "../../components/layouts/main-layout";
import { useAuthStore } from "../../lib/store/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading: isLoading } = useAuthStore();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [rememberme] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorResponse("");
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRememberme(event.target.checked);
  // };

  const handleBlur = () => {};

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await login({
      email: form.email,
      password: form.password,
      rememberme,
    });

    if (response.success) {
      navigate(redirect || "/dashboard");
    } else {
      setErrorResponse(response.error || "Login failed");
    }
  }

  return (
    <MainLayout>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-150 w-150 rounded-full bg-accent/5 blur-[150px]" />
        </div>
        <div className="relative w-full max-w-md">
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="mb-8 text-center">
              <Link to="/" className="mb-4 inline-flex items-center gap-2">
                Blogify
              </Link>
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>
            {errorResponse && (
              <div className="mb-4 rounded-md border border-red-500 bg-red-500/10 p-3 text-sm text-red-500">
                {errorResponse}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <CustomLabel htmlFor="email">Email</CustomLabel>
                <CustomInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CustomLabel htmlFor="password">Password</CustomLabel>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Forgot password?
                  </Link>
                </div>
                <CustomInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-secondary"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:bg-foreground/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/signup"
                className="font-medium text-foreground hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

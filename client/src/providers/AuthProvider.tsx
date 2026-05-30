import { useEffect } from "react";
import { useAuthStore } from "../lib/store/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth, isInitializing } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isInitializing) {
    // You could return a loading spinner here if desired
    // return <LoadingSpinner />;
    return null;
  }

  return children;
}

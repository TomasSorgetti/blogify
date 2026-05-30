import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  // if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

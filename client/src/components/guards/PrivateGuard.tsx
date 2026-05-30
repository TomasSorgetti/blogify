import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";

export default function PrivateGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();

  // if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
}

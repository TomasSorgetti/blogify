import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import OnboardingPage from "../pages/auth/onboarding";
import AuthGuard from "../components/guards/AuthGuard";
import VerifyEmail from "../pages/auth/verify-email";
import ConfirmEmail from "../pages/auth/confirm-email";

const authRoutes = [
  { path: "signin", element: <LoginPage /> },
  { path: "signup", element: <RegisterPage /> },
  { path: "onboarding", element: <OnboardingPage /> },
  { path: "verify-email", element: <VerifyEmail /> },
  { path: "confirm-email", element: <ConfirmEmail /> },
];

export default function AuthRoutes() {
  return (
    <Routes>
      {authRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<AuthGuard>{element}</AuthGuard>}
        />
      ))}
    </Routes>
  );
}

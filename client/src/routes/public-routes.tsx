import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing";
import PricingPage from "../pages/pricing";
import DocsPage from "../pages/docs";
import QuickStartPage from "../pages/docs/quickstart";
import EndpointsPage from "../pages/docs/api/endpoints";
import BlogPage from "../pages/blog";
import ArticlePage from "../pages/blog/article";

const publicRoutes = [
  { path: "", element: <LandingPage /> },
  { path: "pricing", element: <PricingPage /> },
  { path: "blog", element: <BlogPage /> },
  { path: "blog/:slug", element: <ArticlePage /> },
  { path: "docs", element: <DocsPage /> },
  { path: "docs/quickstart", element: <QuickStartPage /> },
  { path: "docs/api/endpoints", element: <EndpointsPage /> },
];

export default function PublicRoutes() {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

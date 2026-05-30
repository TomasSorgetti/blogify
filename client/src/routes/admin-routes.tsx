import { Routes, Route } from "react-router-dom";
// import AdminGuard from "../components/guards/AdminGuard";

const adminRoutes = [
  { path: "", element: <h1>Admin</h1> },
  // { path: "", element: <DashboardPage /> }
];

/**
 * Todo guard
 *
 */
export default function AdminRoutes() {
  return (
    <Routes>
      {adminRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            //   <AdminGuard>
            <div>{element}</div>
            //   </AdminGuard>
          }
        />
      ))}
    </Routes>
  );
}

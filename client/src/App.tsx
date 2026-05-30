import { Route, Routes } from "react-router-dom";

import PublicRoutes from "./routes/public-routes";
import AuthRoutes from "./routes/auth-routes";
import UserRoutes from "./routes/user-routes";
import AdminRoutes from "./routes/admin-routes";
import ErrorRoutes from "./routes/error-routes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/dashboard/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />

      <Route path="/error/*" element={<ErrorRoutes />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;

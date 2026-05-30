import { Routes, Route } from "react-router-dom";

const errorRoutes = [
  //   { path: "403", element: <UnauthorizedPage /> },
  //   { path: "500", element: <ServerDownPage /> },
  { path: "403", element: <h1>Forbidden</h1> },
  {
    path: "500",
    element: <h1 className="text-white text-5xl">Internal Server Error</h1>,
  },
];

export default function ErrorRoutes() {
  return (
    <Routes>
      {errorRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

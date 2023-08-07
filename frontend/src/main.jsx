import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import Login from "./auth/LoginForm";
import SignUp from "./auth/SignupForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorPage from "./ErrorPage.jsx";
import AuthProvider from "./context/AuthContext";
import "./index.css";
import MainP from "./threesrctors/mainpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainP />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

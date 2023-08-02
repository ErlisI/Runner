import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Login, { action as loginAction } from "./assets/LoginForm";
import SignUp, { action as signUpAction } from "./assets/SignupForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorPage from "./ErrorPage.jsx";
import AuthProvider from "./context/AuthContext";
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <SignUp />,
    action: signUpAction,
  },
  {
    path: "/User",
    element: (
      
        <Root />
      
    ),
    errorElement: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

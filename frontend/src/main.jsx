import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Login, { action as loginAction } from "./assets/LoginForm";
//import Signup, { action as signupAction } from "./assets/SignupForm";
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
    path: "/User",
    element: <Root />,
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

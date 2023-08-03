import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root , {
  loader as rootLoader,

} from "./routes/root";
import Login, { action as loginAction } from "./auth/LoginForm";
import SignUp, { action as signUpAction } from "./auth/SignupForm";
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
    errorElement: <ErrorPage />,
    action: signUpAction,
  },
  {
    path: "/User",
    element: (
      
        <Root />
      
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

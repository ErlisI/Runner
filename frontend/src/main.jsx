import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Login from "./routes/loginpage";
import ErrorPage from "./ErrorPage.jsx";
import {loader as l} from "./first";
import Addtable,{action as addtableaction} from "./addtable"
import './index.css';


const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/User",
    loader: l,
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/User/addtable",
    element: <Addtable />,
    action: addtableaction,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

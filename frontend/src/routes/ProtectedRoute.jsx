import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  // console.log(cur)

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

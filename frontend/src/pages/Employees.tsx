import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function Employees() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return <div className="container">Employees</div>;
}

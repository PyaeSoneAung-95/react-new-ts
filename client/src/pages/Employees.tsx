import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import EmployeeList from "../components/EmployeeList";
import SEO from "../components/SEO";

export default function Employees() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return (
    <div className="container">
      <SEO title="Account | Employees" />
      <EmployeeList />
    </div>
  );
}

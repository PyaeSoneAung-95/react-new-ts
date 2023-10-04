import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Sidebar from "../components/Sidebar";

export default function Private() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return (
    <>
      <Sidebar />
      <section className="ml-56 px-4 py-6">
        <Outlet />
      </section>
    </>
  );
}

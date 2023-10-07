import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext<AuthContext | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContext;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: user, addValue, removeValue } = useLocalStorage<User>("user");

  const updateUser = (data: User | null) => {
    data ? addValue(data) : removeValue();
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

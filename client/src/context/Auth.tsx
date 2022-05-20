import { createContext, createSignal, ParentProps, useContext } from 'solid-js';

const AuthContext = createContext({ isLoggedIn: true });

export const AuthProvider = ({ children }: ParentProps) => {
  const [user, setUser] = createSignal(null);
  return <AuthContext.Provider value={{ isLoggedIn: !!user() }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

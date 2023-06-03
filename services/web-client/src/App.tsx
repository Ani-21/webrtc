import { Login } from "./components/Login/Login";
import { LoginContextProvider } from "./contexts/loginContext";

export const App = () => {
  return (
    <LoginContextProvider>
      <Login />
    </LoginContextProvider>
  );
};

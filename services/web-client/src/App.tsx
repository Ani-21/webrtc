import { useEffect } from "react";
import { Room } from "./components/Room/Room";
import { LoginContextProvider } from "./contexts/loginContext";
import { useSocketContext } from "./contexts/socketContext";

export const App = () => {
  const { connect } = useSocketContext();

  useEffect(() => {
    connect();
  }, []);

  return (
    <LoginContextProvider>
      <Room />
    </LoginContextProvider>
  );
};

import { useEffect } from "react";
import { Room } from "./components/Room/Room";
import { useSocketContext } from "./contexts/socketContext";

export const App = () => {
  const { connect } = useSocketContext();

  useEffect(() => {
    connect();
  }, []);

  return <Room />;
};

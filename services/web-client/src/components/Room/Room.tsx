import { useLoginContext } from "@/contexts/loginContext";
import { Login } from "../Login/Login";

export const Room = () => {
  const { isLoggedIn } = useLoginContext();

  return <>{isLoggedIn ? <div>Welcome to room</div> : <Login />}</>;
};

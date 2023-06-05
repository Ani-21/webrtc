import { useLoginContext } from "@/contexts/loginContext";
import { Login } from "../Login/Login";
import { VideoContainer } from "../VideoContainer/VideoContainer";

export const Room = () => {
  const { isLoggedIn } = useLoginContext();

  if (isLoggedIn) {
    return <VideoContainer />;
  } else {
    return <Login />;
  }
};

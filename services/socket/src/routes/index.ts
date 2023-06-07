import { Router } from "../services/socket/router";
import { userRouter } from "./root/user/router";
import { messagesRouter } from "./root/messages/router";

const router = new Router();

router.addRouter("user", userRouter);
router.addRouter("messages", messagesRouter);

export const rootRouter = router;

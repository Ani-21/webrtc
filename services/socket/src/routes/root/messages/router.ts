import { Router } from "../../../services/socket/router";
import * as controller from "./controller";

const router = new Router();

router.addRoute({ path: "sendMessage" }, controller.sendMessage);

export const messagesRouter = router;

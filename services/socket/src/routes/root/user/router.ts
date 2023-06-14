import { Router } from "../../../services/socket/router";
import * as controller from "./controller";
import * as schemeValidator from "./schemeValidator";

const router = new Router();

router.addRoute({ path: "login" }, schemeValidator.login, controller.login);
router.addRoute({ path: "logout" }, controller.logout);

export const userRouter = router;

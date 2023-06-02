import { Router } from '../../../services/socket/router';
import * as controller from './controller';

const router = new Router();

router.addRoute(
    {path: 'login'},
    controller.login
)

router.addRoute(
    {path: 'update'},
    controller.login
)

export const userRouter = router
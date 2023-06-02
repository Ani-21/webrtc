import { Router } from '../services/socket/router';
import { userRouter } from './root/user/router';

const router = new Router();

router.addRouter('user', userRouter);

export const rootRouter = router;

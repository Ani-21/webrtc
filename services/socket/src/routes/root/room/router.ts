import { Router } from '../../../services/socket/router';
import * as controller from './controller';

const router = new Router();

router.addRoute(
    { path: 'room' },
    controller.room,
);

export const roomRouter = router;

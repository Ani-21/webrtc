import { IRouteFn } from '../../../../types/socket';
import { room as roomService } from '../../../services/room/room';

export const world: IRouteFn = async (socket, data) => {
    const result = await roomService({ name: data.name });
    return result;
};
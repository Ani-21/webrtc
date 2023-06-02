import { IRouteFn } from '../../../../types/socket';
import { login as loginService } from '../../../services/user/login'

export const login: IRouteFn = async (req, res) => {
    const result = await loginService({name: res.name});
    return result;
}
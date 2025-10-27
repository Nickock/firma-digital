import { HttpStatus } from '../constants/enums';
import UserController from '../api/user/controller';
import apiResponse from '../utils/apiResponse';
export const statusMiddleware = (status) => {
    return async (req, res, next) => {
        const userStatus = (await UserController.getUserStatus(res.locals.user.id)).status;
        // console.log(userStatus)
        if (!status.find((s) => s == userStatus)) {
            return res
                .status(HttpStatus.FORBIDDEN)
                .json(apiResponse(false, { message: 'No tienes permisos de realizar esta accion' }));
        }
        next();
    };
};

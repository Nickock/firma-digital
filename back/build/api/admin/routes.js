import { Router } from 'express';
import { roleMiddleware } from '../../middlewares/roleMiddleware';
import { HttpStatus, UserRole } from '../../constants/enums';
import apiResponse from '../../utils/apiResponse';
import { validateSchema } from '../../utils/validateSchema';
import { autentifyUserSchema } from '../../schemas/AdminSchema';
import AdminController from './controller';
export const adminRouter = Router();
adminRouter.patch('/user', roleMiddleware([UserRole.ADMIN]), async (req, res) => {
    const body = validateSchema(req.body, autentifyUserSchema);
    if (!body.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { error: 'La id de usuario no es válida' }));
    }
    const userId = body.data?.userId;
    if (userId) {
        const response = await AdminController.autentifyUser(userId);
        if (!response.succes) {
            return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { error: response.error }));
        }
        return res.status(HttpStatus.OK).json(apiResponse(true, { message: 'Usuario actualizado' }));
    }
    res.status(200).json(apiResponse(true, { message: 'role ok' }));
});

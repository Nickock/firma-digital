import { AppDataSource } from '../../db/connect';
import { User } from '../../entities/User.entity';
import { AuditLogActions, UserStatus } from '../../constants/enums';
import AuditLogController from '../audit/controller';
class AdminService {
    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
    }
    async autentifyUser(idUser) {
        try {
            const user = await this.userRepo.findOne({ where: { id: idUser } });
            if (!user) {
                return { succes: false, error: 'El usuario no existe' };
            }
            if (user.status != UserStatus.DATA_UPLOAD) {
                return { succes: false, error: 'El usuario ya está autentificado, o no está listo para estarlo' };
            }
            user.status = UserStatus.AUNTENTIFIED;
            await this.userRepo.save(user);
            //Audit log
            try {
                await AuditLogController.create(idUser, AuditLogActions.USER_AUNTENTIFIED);
            }
            catch {
                console.error('No se pudo crear el audit log de autenticacion de usuario'.bgYellow);
            }
            return { succes: true };
        }
        catch (error) {
            console.error('[AdminService]:autentifyUser'.bgRed);
            console.error(error);
            return { succes: false, error: 'Error del servidor' };
        }
    }
}
export default new AdminService();

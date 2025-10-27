import AdminService from './service';
export default class AdminController {
    static async autentifyUser(idUser) {
        return await AdminService.autentifyUser(idUser);
    }
}

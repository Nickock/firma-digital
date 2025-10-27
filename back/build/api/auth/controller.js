import AuthService from './service';
export default class AuthController {
    static { this.register = async (email, pass, confirmPass) => {
        try {
            if (pass != confirmPass) {
                return { token: '', error: 'Las contraseñas no coinciden' };
            }
            const payload = { email, pass };
            return await AuthService.register(payload);
        }
        catch {
            return { token: '', error: 'Error del servidor' };
        }
    }; }
    static { this.login = async (email, pass) => {
        try {
            const payload = { email, pass };
            return await AuthService.login(payload);
        }
        catch {
            return { token: '', error: 'Error del servidor' };
        }
    }; }
}

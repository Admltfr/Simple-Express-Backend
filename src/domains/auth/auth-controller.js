import AuthService from "./auth-service.js";
import BaseResponse from "../../utils/response.js";

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      return BaseResponse.success(
        res,
        { user: { id: user.id, email: user.email, name: user.name }, token },
        "Login success"
      );
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await AuthService.register({ name, email, password });
      return BaseResponse.created(
        res,
        { user: { id: user.id, name: user.name, email: user.email } },
        "Register success"
      );
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();

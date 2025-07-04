import AuthService from "./auth-service.js";
import BaseResponse from "../../utils/base-response.js";

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

  async me(req, res, next) {
    try {
      const { id } = req.body;
      const user = await AuthService.me({ id });
      return BaseResponse.success(
        res,
        {
          user: {
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
          },
        },
        "Fetch user data success"
      );
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await AuthService.index();
      return BaseResponse.success(res, { users }, "Fetch all users success");
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { password } = req.body;
      const id = req.user.id;
      const user = await AuthService.resetPassword(id, password);
      return BaseResponse.success(res, { user }, "Reset password success");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { email, name } = req.body;
      const id = req.user.id;
      const user = await AuthService.update(id, { email, name });
      return BaseResponse.success(res, { user }, "Update user success");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.user.id;
      const user = await AuthService.delete(id);
      return BaseResponse.success(res, { user }, "Delete user success");
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();

import AuthService from "../services/auth-service.js";

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.json({
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await AuthService.register({ name, email, password });
    res.status(201).json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
}

export default new AuthController();

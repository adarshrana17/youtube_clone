import authenticateUser from "../middlewares/authUserMiddleware.js";

export function authUserRoutes(app) {
  app.get("/user", authenticateUser, (req, res) => {
    res.json({ user: req.user });
  });
}

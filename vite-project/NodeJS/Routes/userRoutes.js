import { registerUser, loginUser, logOut, loggedinUser } from "../Controller/userController.js";
import authenticateUser from "../middlewares/authUserMiddleware.js";

export function userRoutes(app) {
  app.post("/register", registerUser);
  app.post("/login", loginUser);
  app.get("/loggedin-user", authenticateUser, loggedinUser);
  app.post("/logout", logOut);
}

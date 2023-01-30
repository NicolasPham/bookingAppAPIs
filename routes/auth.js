import express from "express";
import * as auth from "../controllers/auth.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);

router.get("/all", verifyToken, verifyAdmin, auth.getAll);

router.get("/", auth.test);

// router.get("/check", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you can delete account");
// });
// router.get("/checkadmin", verifyAdmin, (req, res) => {
//   res.send("Hello admin");
// });

export default router;

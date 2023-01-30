import express from "express";
import * as user from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, verifyUser, user.updateUser);
router.delete("/:id", verifyToken, verifyUser, user.deleteUser);

export default router;

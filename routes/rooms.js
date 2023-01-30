import express from "express";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import * as room from "../controllers/room.js";

const router = express.Router();

router.post("/:hotelId", verifyToken, verifyAdmin, room.createRoom);
router.put("/:id", verifyToken, verifyAdmin, room.updateRoom);
router.delete("/:id", verifyToken, verifyAdmin, room.deleteRoom);
router.get("/all", verifyToken, verifyUser, room.getAllRoom);
router.get("/:id", verifyToken, verifyAdmin, room.getRoom);

export default router;

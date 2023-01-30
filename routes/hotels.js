import express from "express";
import * as hotel from "../controllers/hotel.js";

/**Verify User and Admin */
import { verifyToken, verifyAdmin } from "../utils/verifyToken.js";
/***Handle Error */

const router = express.Router();

//CREATE
router.get("/", (req, res) => {
  res.send("Hotel page");
});

router.post("/", verifyToken, verifyAdmin, hotel.createHotel);
router.put("/:id", verifyToken, verifyAdmin, hotel.updateHotel);
router.delete("/:id", verifyToken, verifyAdmin, hotel.deleteHotel);

//GET ALL
router.get("/all", hotel.getAllHotel);
router.get("/countByCity", hotel.countByCity);
router.get("/countByType", hotel.countByType);

//GET
router.get("/:id", hotel.getOneHotel);

export default router;

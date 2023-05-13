import express from "express";
import { signin, signOut } from "../controllers/sessionsController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/refresh");
router.post("/signout", signOut);

export default router;

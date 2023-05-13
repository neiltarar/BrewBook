import express from "express";
import { signin, signout } from "../controllers/sessionsController.js";
import { signup } from "../controllers/userController.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

export default router;

import express from "express";
import { getBeers } from "../controllers/beersController.js";

const router = express.Router();
router.get("/serve-beers", getBeers);

export default router;

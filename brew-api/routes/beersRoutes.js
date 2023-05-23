import express from "express";
import { getBeers, addBeers } from "../controllers/beersController.js";

const router = express.Router();
router.get("/serve-beers", getBeers);
router.post("/pour-new", addBeers);

export default router;

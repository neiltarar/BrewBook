import express from "express";
import { BeersControllers } from "../controllers/beersController.js";

const router = express.Router();
router.get("/serve-beers", BeersControllers.getBeers);
router.post("/pour-new", BeersControllers.addBeers);
router.put("/tweak-beer/:id", BeersControllers.editBeer);

export default router;

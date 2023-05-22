import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import beersRoutes from "./routes/beersRoutes.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config(); // Load the env variables
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/sessions", sessionsRoutes);
app.use("/beers-brewing", authenticateToken, beersRoutes);
app.use("/", (req, res) => {
	res.send("brewery is open :)");
});

const PORT = process.env.EXPRESS_PORT;
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);

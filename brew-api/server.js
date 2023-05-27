import express from "express";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import beersRoutes from "./routes/beersRoutes.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config(); // Load the env variables
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use("/users", userRoutes);
app.use("/sessions", sessionsRoutes);
app.use("/beers-brewing", authenticateToken, beersRoutes);
app.use("/check", authenticateToken, (req, res) => {
	res.send("brewery is open :)");
});

app.use((req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.EXPRESS_PORT;
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);

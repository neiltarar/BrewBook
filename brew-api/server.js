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
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

dotenv.config(); // Load the env variables
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const DIR = "./uploadedImages";
const imageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
		const uniqueId = uuidv4(); // Generate a unique identifier using UUIDv4

		const originalFileName = file.originalname; // Get the original file name
		const fileExtension = path.extname(originalFileName); // Extract the file extension using the path module

		const filename = `${currentDate}-${uniqueId}${fileExtension}`; // Combine the date, unique ID, and file extension
		cb(null, filename);
	},
});

var upload = multer({
	storage: imageStorage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
		}
	},
	limits: {
		fileSize: 5000000, // limit file size to 5MB
	},
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use("/users", userRoutes);
app.use("/sessions", sessionsRoutes);
app.use(
	"/beers-brewing",
	authenticateToken,
	upload.single("image"),
	beersRoutes
);
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

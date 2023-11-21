import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDb} from "./Services/connectDBService.js";
import { errorHandler } from "./Middlewares/errorMiddleware.js";
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js";
import categoriesRouter from "./Routes/CategoriesRouter.js";
import uploadRouter from "./Controllers/UploadFile.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.get("/" , (req, res) => {
    res.send("API running")
});

app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", uploadRouter);

app.use(errorHandler)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`sever is running ${PORT}`);
});
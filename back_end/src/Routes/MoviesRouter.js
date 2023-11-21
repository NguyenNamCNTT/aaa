import express from "express";
import * as moviesController from "../Controllers/MoviesController.js";
import { protect, admin } from "../Middlewares/authMiddleware.js";
const router = express.Router();

router.post("/import", moviesController.importMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMoviesById);
router.get("/rated/top", moviesController.getTopRateMovies);
router.get("/randomm", moviesController.getRandomMovies);

router.post("/:id/reviews", protect, moviesController.createMovieReview);

router.post("/", protect, admin, moviesController.createMovie);
router.put("/:id", protect, admin, moviesController.updateMovie);
router.delete("/:id", protect, admin, moviesController.deleteMovie);
router.delete("/", protect, admin, moviesController.deleteAllMovie);

export default router;

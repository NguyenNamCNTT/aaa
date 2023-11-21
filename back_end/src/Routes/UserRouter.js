import express from "express";
import * as userControler from "../Controllers/UserController.js";
import { protect, admin } from "../Middlewares/authMiddleware.js";
const router = express.Router();

router.post("/",userControler.registerUser);
router.post("/login", userControler. loginUser);

router.put("/", protect, userControler.updateUser );
router.put("/password", protect, userControler.changeUserPassword);
router.get("/favorites", protect, userControler.getLikeMovies);
router.post("/favorites", protect, userControler.addLikeMovies);
router.delete("/favorites", protect, userControler.deleteLikeMovies);

router.get("/", protect, admin, userControler. getUser);
router.delete("/:id", protect, admin, userControler.deleteUser);
export default router;
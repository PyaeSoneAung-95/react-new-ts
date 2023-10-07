import express from "express";
import {
  getAll,
  login,
  signup,
  update,
  updateProfile,
  updateStatus,
} from "../controllers/employeeController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAll);
router.post("/login", login);
router.post("/signup", signup);
router.put("/", update);
router.put("/profile/:id", upload.single("file"), updateProfile);
router.put("/:id/status", updateStatus);

export default router;

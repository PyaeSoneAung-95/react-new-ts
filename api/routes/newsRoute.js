import express from "express";
import upload from "../middleware/upload.js";
import {
  getNewsGroupByCategory,
  getNewsByCategory,
  getNewsByEmployeeId,
  getNewsById,
  create,
  deleteNews,
  update,
  getRelatedNews
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/group_by_category", getNewsGroupByCategory);
router.get("/category", getNewsByCategory);
router.get("/related", getRelatedNews)
router.get("/employee/:employeeId", getNewsByEmployeeId);
router.get("/:newsId", getNewsById);
router.post("/", upload.single("file"), create);
router.delete("/:id", deleteNews);
router.put("/", upload.single("file"), update);
export default router;

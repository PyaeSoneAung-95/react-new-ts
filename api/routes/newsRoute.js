const router = require("express").Router();
const upload = require("../middleware/upload");
const newsController = require("../controllers/newsController");

router.get("/group_by_category", newsController.getNewsGroupByCategory);
router.get("/category", newsController.getNewsByCategory);
router.get("/employee/:employeeId", newsController.getNewsByEmployeeId);
router.get("/:newsId", newsController.getNewsById);
router.post("/", upload.single("file"), newsController.create);
router.delete("/:id", newsController.delete);
router.put("/", upload.single("file"), newsController.update);

module.exports = router;

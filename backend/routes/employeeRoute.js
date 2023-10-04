const router= require("express").Router();
const employeeController = require("../controllers/employeeController");
const upload = require("../middleware/upload");

router.post("/login", employeeController.login);
router.post("/signup", employeeController.signup);
router.put("/", employeeController.update);
router.put("/profile/:id", upload.single("file"), employeeController.updateProfile)

module.exports = router;
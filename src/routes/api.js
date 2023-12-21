// external imports
const express = require("express");
const {
  createCourse,
  test,
  getAllCourses,
  getACourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { login } = require("../controllers/usersController");
const authVerifyMiddleware = require("../middlewares/authVerifyModdleware");
const router = express.Router();
// admin route
router.post("/admin/login", login);

//course routes
router.post("/create", authVerifyMiddleware, createCourse);
router.get("/courses", getAllCourses);
router.get("/course/:id", getACourse);
router.post("/course/update", authVerifyMiddleware, updateCourse);
router.delete("/course/delete/:id", authVerifyMiddleware, deleteCourse);

module.exports = router;

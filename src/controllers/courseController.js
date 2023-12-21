const Course = require("../models/course");

const getACourse = async function (req, res) {
  const id = req.params.id;
  try {
    const course = await Course.findById(id);
    res.status(200).json({ status: "success", data: course });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.message });
  }
};
const getAllCourses = async function (req, res) {
  try {
    const courses = await Course.find();
    res.status(200).json({ status: "success", data: courses });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.message });
  }
};
const createCourse = async function (req, res) {
  const course = new Course(req.body);
  try {
    await course.save();
    res.status(200).json({
      msg: "“The course has been added successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.message });
  }
};
const updateCourse = async function (req, res) {
  const id = req.body.id;
  const course = req.body;
  try {
    if (!id) {
      res.status(400).json({
        msg: "Course id is required",
      });
    } else {
      await Course.findByIdAndUpdate(id, course);
      res.status(200).json({
        msg: "“The course has been updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.message });
  }
};
const deleteCourse = async function (req, res) {
  const id = req.params.id;
  try {
    await Course.findByIdAndDelete(id);
    res.status(200).json({
      msg: "“The course has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.message });
  }
};
module.exports = {
  createCourse,
  getACourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const {
  registerStudent,
  getApplicationsByApprovalStatus,
} = require("../controller/student.controller");

router.post(
  "/register",
  upload.fields([
    { name: "passport", maxCount: 1 },
    { name: "transcript", maxCount: 1 },
  ]),
  registerStudent
);

router.get("/applications", getApplicationsByApprovalStatus);

module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");

const {
  StudyAbroadApplication,
  rejectApplication,
  getAllAbroadApplications,
  updatePaymentStatusAndApproved,
} = require("../controller/abroad.controller");

router.post(
  "/application",
  upload.fields([
    { name: "passport_pic", maxCount: 1 },
    { name: "transcript_doc", maxCount: 1 },
    { name: "id_passport", maxCount: 1 },
    { name: "vaccine", maxCount: 1 },
  ]),

  StudyAbroadApplication
);

//router.get("/application", StudyAbroadApplication);
router.get("/applications", getAllAbroadApplications);
router.put("/application/:id/reject", rejectApplication);
router.put("/application/:id/updateStatus", updatePaymentStatusAndApproved);

module.exports = router;

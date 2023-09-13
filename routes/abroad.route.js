const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");

const { StudyAbroadApplication, rejectApplication, getAllAbroadApplications } = require("../controller/abroad.controller");

router.post(
  "/application",
  upload.fields([
    { name: "passport_pic", maxCount: 1 },
    { name: "transcript_doc", maxCount: 1 },
    { name: "id_passport" , maxCount:1},
    { name: "vaccine" , maxCount:1},
  ]),

  StudyAbroadApplication
);

// router.get("/applications", StudyAbroadApplication);
router.get("/applications", getAllAbroadApplications);
router.put("/application" , rejectApplication )

module.exports = router;

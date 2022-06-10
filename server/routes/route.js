const express=require("express");
const router=express.Router();

const studentController=require("../controller/studentController");

router.post("/register",studentController.postStudent);
router.get("/get-students",studentController.getStudents);
router.put("/edit/:id",studentController.putEditStudent);
router.delete("/delete/:id",studentController.deleteStudent)

module.exports=router;
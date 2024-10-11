import express from "express";
const router = express.Router();

import * as studentController from "../controllers/studentController.js"
import * as fileController from "../controllers/fileController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

//user
router.post("/createProfile",studentController.createProfile);
router.post("/login",studentController.login);
router.post("/logout",authMiddleware,studentController.logout);
router.get("/viewProfile",authMiddleware,studentController.viewProfile);
router.post("/updateProfile",authMiddleware,studentController.updateProfile);

//file 
router.post("/uploadSingleFile",authMiddleware,fileController.uploadSingleFile);
router.get("/readFile/:fileName",authMiddleware,fileController.readFile);
router.delete("/deleteSingleFile/:fileName",authMiddleware,fileController.deleteSingleFile);
// router.post("/uploadMultipleFiles",authMiddleware,fileController.uploadMultipleFiles);
// router.delete("/deleteMultipleFile",authMiddleware,fileController.deleteMultipleFile);

export default router;
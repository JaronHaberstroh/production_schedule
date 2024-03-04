import { Router } from "express";
import { createDepartment } from "../controllers/department/createDepartment.js";

const router = Router();

router.post("/create", createDepartment);
// router.get("/read", departmentController.readDepartment);
// router.put("/update", departmentController.updateDepartment);
// router.delete("/delete", departmentController.deleteDepartment);

export default router;

import { Router } from "express";
import createDepartment from "#controllers/department/createDepartment.js";
import deleteDepartment from "#controllers/department/deleteDepartment.js";
import readDepartment from "#controllers/department/readDepartment.js";
import updateDepartment from "#controllers/department/updateDepartment.js";

const router = Router();

router.post("/create", createDepartment);
router.get("/read/:departmentName", readDepartment);
router.patch("/update", updateDepartment);
router.delete("/delete/:id", deleteDepartment);

export default router;

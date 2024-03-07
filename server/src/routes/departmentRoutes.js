import { Router } from "express";
import { postDepartment } from "../controllers/department/postDepartment.js";
import { deleteDepartment } from "../controllers/department/deleteDepartment.js";
import { getDepartment } from "../controllers/department/getDepartment.js";
import { patchDepartment } from "../controllers/department/patchDepartment.js";

const router = Router();

router.post("/create", postDepartment);
router.get("/read", getDepartment);
router.patch("/update", patchDepartment);
router.delete("/delete/:id", deleteDepartment);

export default router;

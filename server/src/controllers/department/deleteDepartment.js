import Department from "../../models/department.js";
import successResponse from "../../responses/success.js";

import deleteDocument from "../utils/crud/deleteDocument.js";

const deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;

  try {
    // Delete Department
    await deleteDocument(Department, { _id: departmentId });

    return res.json(
      successResponse({
        message: `Department ${departmentId} successfully deleted`,
        data: { DepartmentId: departmentId },
      })
    );

    // Check for Department to confirm deletion
  } catch (error) {
    res.json(serverErrorResponse({}));
  }
};

export default deleteDepartment;

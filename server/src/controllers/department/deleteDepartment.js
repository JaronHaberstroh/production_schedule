import Department from "#models/department.js";
import deleteDocument from "../utils/crud/deleteDocument.js";

import AppError from "#utils/appError.js";

const deleteDepartment = async (req, res) => {
  const departmentId = req.body._id;

  if (!departmentId) {
    throw new AppError("Department ID must be provided", 400);
  }

  const result = await deleteDocument({ _id: departmentId });

  if (!result.success) {
    throw new AppError(result.message || "Unable to delete Department", 500);
  }

  res.status(200);
  res.json({
    statusCode: 200,
    success: true,
    message: "Department successfully deleted",
    data: null,
    error: null,
  });
};

export default deleteDepartment;

import Department from "#models/department.js";
import readDocument from "../utils/crud/readDocument.js";

import AppError from "#utils/appError.js";

const readDepartment = async (req, res) => {
  const departmentName = req.params;

  // Find Departments fitting search params
  const result = await readDocument(Department, departmentName);

  if (!result.success) {
    throw new AppError(result.message || "Unable to find Departments", 500);
  }

  if (!result.data) {
    throw new AppError(result.message || "No data found for search", 404);
  }

  res.status(200);
  res.json({
    statusCode: 200,
    success: true,
    message: result.message || "Successfully found Departments",
    data: result.data,
    error: false,
  });
};

export default readDepartment;

import AppError from "#utils/appError.js";
import Department from "#models/department.js";
import createDocument from "../utils/crud/createDocument.js";

const createDepartment = async (req, res) => {
  // Extract req body
  const departmentData = req.body;

  // Check that department name is provided
  if (!departmentData.departmentName) {
    throw new AppError("Department name must be provided", 400);
  }

  // Call createDocument helper function
  const result = await createDocument(Department, departmentData);

  if (!result.success) {
    throw new AppError(`Unable to save Department: ${result.message}`, 500);
  }

  // Respond with success message
  res.status(201);
  res.json({
    statusCode: 201,
    success: true,
    message: `New Department document successfully created`,
    data: result.data,
    error: null,
  });
};

export default createDepartment;

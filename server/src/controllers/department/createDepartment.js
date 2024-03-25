import Department from "#models/department.js";
import serverErrorResponse from "#utils/responses/error/serverError.js";
import successResponse from "#utils/responses/success/success.js";

import createDocument from "../utils/crud/createDocument.js";

const createDepartment = async (req, res) => {
  const departmentData = req.body;

  try {
    // Create new document in Department collection
    const newDepartment = await createDocument(Department, departmentData);

    // Respond with success message
    return res.status(201).json(
      successResponse({
        message: `Department ${newDepartment.message}`,
        data: newDepartment.data,
      })
    );
  } catch (error) {
    res.json(serverErrorResponse({}));
  }
};

export default createDepartment;

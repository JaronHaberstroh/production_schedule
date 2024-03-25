import Department from "#models/department.js";
import successResponse from "#utils/responses/success/success.js";

import readDocument from "../utils/crud/readDocument.js";

const readDepartment = async (req, res) => {
  const departmentData = req.param.departmentName;

  console.log(departmentData);

  try {
    // Find Departments fitting search params
    const result = await readDocument(Department, departmentData);

    return res.status(200).json(
      successResponse({
        message: result.message,
        data: result.data,
      })
    );
  } catch (error) {
    res.json(serverErrorResponse({}));
  }
};

export default readDepartment;

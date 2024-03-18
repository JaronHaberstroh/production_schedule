import Department from "../../models/department.js";
import successResponse from "../../responses/success.js";
import serverErrorResponse from "../../responses/serverError.js";
import clientErrorResponse from "../../responses/clientError.js";

import updateDocument from "../utils/crud/updateDocument.js";

const updateDepartment = async (req, res) => {
  const queryDepartmentData = req.body.query;
  const updateDepartmentData = req.body.update;
  const { departmentName } = updateDepartmentData;

  try {
    // Update Department
    const result = await updateDocument(
      Department,
      queryDepartmentData.id,
      updateDepartmentData
    );

    // Confirm Department was modified and return appropiate response
    if (!result.data.modifiedCount === 1) {
      return res.json(
        clientErrorResponse({
          message: `No matching data found for provided _id.`,
        })
      );
    }

    return res.json(
      successResponse({
        message: `Department ${departmentName} updated successfully.`,
        data: result,
      })
    );
  } catch (error) {
    res.json(serverErrorResponse({}));
  }
};

export default updateDepartment;

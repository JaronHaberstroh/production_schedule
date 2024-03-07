import Department from "../../models/department.js";
import successResponse from "../../responses/success.js";
import serverErrorResponse from "../../responses/serverError.js";
import clientErrorResponse from "../../responses/clientError.js";

export const patchDepartment = async (req, res) => {
  const queryDepartmentData = req.body.query;
  const updateDepartmentData = req.body.update;
  const { departmentName } = updateDepartmentData;

  try {
    // Check required fields are provided

    // Update Department
    const result = await Department.updateOne(
      { _id: queryDepartmentData.id },
      updateDepartmentData
    );

    // Confirm Department was modified and return appropiate response
    if (result.modifiedCount === 1) {
      return res.json(
        successResponse({
          message: `Department ${departmentName} updated successfully.`,
          data: result,
        })
      );
    } else {
      return res.json(
        clientErrorResponse({
          message: `No matching data found for provided _id.`,
        })
      );
    }
  } catch (error) {
    console.error("Error updating department: ", error);
    res.json(serverErrorResponse({}));
  }
};

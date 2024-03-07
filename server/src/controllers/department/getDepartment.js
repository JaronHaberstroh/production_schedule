import Department from "../../models/department.js";
import successResponse from "../../responses/success.js";

export const getDepartment = async (req, res) => {
  const departmentData = req.param;
  const { departmentName } = departmentData;

  try {
    // Check required fields are provided

    // Find Departments fitting search params
    const result = await Department.find({});

    return res.json(
      successResponse({
        message: "All departments fitting search paramaters returned.",
        data: result,
      })
    );
  } catch (error) {
    console.error("Error reading department: ", error);
    res.json(serverErrorResponse({}));
  }
};

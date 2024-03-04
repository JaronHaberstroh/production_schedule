import Department from "../../models/department";

export const deleteDepartment = async (req, res) => {
  const departmentData = req.body;
  const { departmentName } = departmentData;

  try {
    // Check required fields are provided
    if (!handleCheckRequiredFields(departmentData, res)) return;

    // Get Department _id
  } catch (error) {
    console.error("Error deleting department: ", error);
    res.json(serverErrorResponse({}));
  }
};

export const updateDepartment = async (req, res) => {
  const departmentData = req.body;
  const { departmentName } = departmentData;

  try {
    // Check required fields are provided
    if (!handleCheckRequiredFields(departmentData, res)) return;
  } catch (error) {
    console.error("Error updating department: ", error);
    res.json(serverErrorResponse({}));
  }
};

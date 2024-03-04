export const readDepartment = async (req, res) => {
  const departmentData = req.body;
  const { departmentName } = departmentData;

  try {
    // Check required fields are provided
    if (!handleCheckRequiredFields(departmentData, res)) return;

    //
  } catch (error) {
    console.error("Error reading department: ", error);
    res.json(serverErrorResponse({}));
  }
};

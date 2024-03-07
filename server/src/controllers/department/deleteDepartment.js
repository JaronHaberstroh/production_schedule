import Department from "../../models/department.js";
import successResponse from "../../responses/success.js";

export const deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;

  try {
    // Check required fields are provided

    // Delete Department
    await Department.deleteOne({ _id: departmentId });

    return res.json(
      successResponse({
        message: `Department ${departmentId} successfully deleted`,
        data: { DepartmentId: departmentId },
      })
    );

    // Check for Department to confirm deletion
  } catch (error) {
    console.error("Error deleting department: ", error);
    res.json(serverErrorResponse({}));
  }
};

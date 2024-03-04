import Department from "../../models/department.js";
import serverErrorResponse from "../../responses/serverError.js";
import successResponse from "../../responses/success.js";
import { createDepartmentValidation } from "./validation/createDepartmentValidation.js";

export const createDepartment = async (req, res) => {
  const departmentData = req.body;
  const { departmentName } = departmentData;

  try {
    // Validate user request
    const isValid = await createDepartmentValidation(departmentData, res);

    if (!isValid) return;

    // Create new department instance
    const newDepartment = new Department({ departmentName });

    // Save new department to database
    await newDepartment.save();

    // Respond with success message
    return res.status(201).json(
      successResponse({
        message: "Department created successfully",
        data: { Department: newDepartment },
      })
    );
  } catch (error) {
    console.error("Error adding department: ", error);
    res.json(serverErrorResponse({}));
  }
};

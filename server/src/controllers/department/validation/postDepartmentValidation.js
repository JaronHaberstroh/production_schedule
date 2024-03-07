import Department, { departmentSchema } from "../../../models/department.js";
import { getRequiredFields } from "../../../models/utils/getRequiredFields.js";
import clientErrorResponse from "../../../responses/clientError.js";

export const createDepartmentValidation = async (data, res) => {
  const { departmentName } = data;

  if (
    !areRequiredFieldsProvided(data, departmentSchema) ||
    departmentName.length === 0
  ) {
    res.json(clientErrorResponse({ message: "Department name is required." }));
    return false;
  }

  // Check if entry already exists
  if (await doesDepartmentExist(departmentName)) {
    res.json(clientErrorResponse({ message: "Department already exists." }));
    return false;
  }

  return true;
};

const areRequiredFieldsProvided = (bodyData, schemaData) => {
  const requiredFields = getRequiredFields(schemaData);

  return requiredFields.every((field) => bodyData.hasOwnProperty(field));
};

const doesDepartmentExist = async (departmentName) => {
  const entryExists = await Department.findOne({ departmentName });
  return !!entryExists;
};

// Returns an array of required fields from provided schema
export const getRequiredFields = (schemaData) => {
  const requiredFields = Object.keys(schemaData.paths).filter(
    (path) => schemaData.paths[path].isRequired
  );
  return requiredFields;
};

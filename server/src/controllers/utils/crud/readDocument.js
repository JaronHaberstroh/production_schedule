const readDocument = async (model, params) => {
  // Init variabale
  let result;

  try {
    // Find document based on provided params
    result = await model.find(params);

    // Return success object
    return {
      success: true,
      message: `Successfully retreived ${model.modelName}`,
      data: result,
      error: null,
    };
  } catch (error) {
    // Handle error
    return {
      success: false,
      message:
        error.message ||
        `Error retrieving ${model.modelName}, params: ${params}`,
      data: result,
      error: error,
    };
  }
};

export default readDocument;

const readDocument = async (model, params) => {
  try {
    // Find document based on provided params
    const result = await model.find(params);

    // Return success object
    return {
      success: true,
      message: "Successfully retried departments matching params",
      data: result,
    };
  } catch (error) {
    // Handle error
    return {
      success: false,
      message: `Failed to retrieve ${model}`,
      error: error,
    };
  }
};

export default readDocument;

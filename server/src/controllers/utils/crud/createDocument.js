const createDocument = async (model, params) => {
  // Init variabale
  let savedDocument;

  try {
    // Create new document
    const newDocument = new model(params);

    // Save new document
    savedDocument = await newDocument.save();

    // Return success object
    return {
      success: true,
      message: `Successfully created ${model.modelName}`,
      data: savedDocument,
      error: null,
    };
  } catch (error) {
    // Handle error
    return {
      success: false,
      message:
        error.message || `Error creating ${model.modelName}, params: ${params}`,
      data: savedDocument,
      error: error,
    };
  }
};

export default createDocument;

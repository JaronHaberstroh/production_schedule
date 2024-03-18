const createDocument = async (model, params) => {
  let validationErrors;
  try {
    // Create new document
    const newDocument = await new model(params);

    // Save new document
    const savedDocument = await newDocument.save();

    // Return success object
    return {
      success: true,
      message: "Document created successfully",
      data: savedDocument,
    };
  } catch (error) {
    // Handle error
    console.error("Error creating document: ", error);
    return {
      success: false,
      message: error.message || `Error creating ${model.modelName} document`,
      data: error,
    };
  }
};

export default createDocument;

const updateDocument = async (model, documentID, params) => {
  // Init variabale
  let result;

  try {
    // Update document
    result = await model.updateOne(documentID, params);

    return {
      success: true,
      message: `Successfully updated ${model.modelName}`,
      data: result,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.message || `Error updating ${model.modelName}, params: ${params}`,
      data: result,
      error: error,
    };
  }
};

export default updateDocument;

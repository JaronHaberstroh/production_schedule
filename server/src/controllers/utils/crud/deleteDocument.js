import AppError from "#utils/appError";

const deleteDocument = async (model, params) => {
  // Init variabale
  let result;

  try {
    // Delete document matching params
    result = await model.deleteOne(params);

    // Check that document was deleted
    if (!result.deletedCount) {
      throw new AppError(
        `Error deleting ${model.modelName}, params: ${params}`,
        500
      );
    }

    // Return success object
    return {
      success: true,
      message: `Successfully deleted ${model.modelName}`,
      data: result,
      error: null,
    };
  } catch (error) {
    // Handle error
    return {
      success: false,
      message:
        error.message || `Error deleting ${model.modelName}, params: ${params}`,
      data: result,
      error: error,
    };
  }
};

export default deleteDocument;

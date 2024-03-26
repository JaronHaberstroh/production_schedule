const deleteDocument = async (model, params) => {
  let result;
  try {
    // Check that param _id is provided
    if (!params._id) {
      throw new Error("Param '_id' is required for deleting a document");
    }

    // Delete document matching params
    result = await model.deleteOne(params);

    // Check that document was deleted
    if (!result.deletedCount) {
      throw new Error(`Document with _id ${params._id} not found`);
    }

    // Return success object
    return {
      success: true,
      message: `Successfully deleted ${model.modelName}`,
      data: result,
    };
  } catch (error) {
    // Handle error
    return {
      success: false,
      message: error.message || `Error deleting ${model.modelName}`,
      data: result || error,
    };
  }
};

export default deleteDocument;

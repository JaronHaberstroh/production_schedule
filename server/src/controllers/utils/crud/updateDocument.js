const updateDocument = async (model, documentID, params) => {
  try {
    // Update document
    const result = await model.updateOne(documentID, params);

    return {
      success: true,
      message: "Successfully updated document",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error updating document",
      data: error,
    };
  }
};

export default updateDocument;

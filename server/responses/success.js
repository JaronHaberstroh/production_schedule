const successResponse = (data, message = "Success", statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    status: statusCode,
  };
};

export default successResponse;

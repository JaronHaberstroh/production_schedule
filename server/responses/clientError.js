const clientErrorResponse = ({ message = "Bad Request", statusCode = 400 }) => {
  return {
    success: false,
    message,
    status: statusCode,
  };
};

export default clientErrorResponse;

const serverErrorResponse = ({
  message = "Internal Server Error",
  statusCode = 500,
}) => {
  return {
    success: false,
    message,
    status: statusCode,
  };
};

export default serverErrorResponse;

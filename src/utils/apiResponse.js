function successResponse(res, _message, data = null, statusCode = 200) {
  return res.status(statusCode).json(data);
}

function errorResponse(res, message, statusCode = 400, data = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    data,
  });
}

module.exports = {
  successResponse,
  errorResponse,
};


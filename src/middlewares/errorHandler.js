const AppError = require('../utils/AppError');
const { errorResponse } = require('../utils/apiResponse');

// Middleware global de tratamento de erros
// Garante respostas padronizadas e sem vazamento de detalhes internos
function errorHandler(err, req, res, next) {
  // Log simples no servidor (poderia ser um logger mais robusto)
  console.error(err);

  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode);
  }

  return errorResponse(res, 'Internal server error', 500);
}

module.exports = errorHandler;


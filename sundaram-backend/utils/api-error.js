class ApiError extends Error {
  constructor(status = 500, message = 'Internal Server Error', details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

module.exports = ApiError;

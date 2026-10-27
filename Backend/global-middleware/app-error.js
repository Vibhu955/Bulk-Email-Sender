class AppError extends Error {
    constructor(statusCode, errorMessage) {
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
}

module.exports = AppError



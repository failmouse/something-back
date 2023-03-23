function sendSuccessResponse(res, data, statusCode = 200) {
    res.status(statusCode).json({
        status: 'success',
        data: data
    });
}

function sendErrorResponse(res, message, statusCode = 400) {
    res.status(statusCode).json({
        status: 'error',
        message: message
    });
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};

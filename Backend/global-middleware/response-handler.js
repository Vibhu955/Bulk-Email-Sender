const respHandler = async (statusCode, data, message, res) => {
    return res.status(statusCode).json({
        status: statusCode,
        data: data,
        message: message
    })
}

module.exports = respHandler
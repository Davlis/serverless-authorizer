const response = (rawBody, statusCode) => ({
    statusCode: statusCode || 200,
    body: JSON.stringify(rawBody),
});

module.exports = response;

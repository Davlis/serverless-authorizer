const jwt = require('jsonwebtoken');
const dynamoDb = require('serverless-dynamodb-client').doc;

const config = require('./config');

const generatePolicy = require('./utils/policy');

const authorize = (event, context, callback) => {
    const { authorizationToken } = event;

    if (!authorizationToken) {
        return callback('Authorization token not found');
    }

    if (!authorizationToken.includes('Bearer ')) {
        return callback('Invalid foormat of Authorization header');
    }

    const token = authorizationToken.replace('Bearer ', '');

    let payload;
    try {
        payload = jwt.verify(token, config.salt);   
    } catch (error) {
        return callback('JWT error');
    }

    dynamoDb.get({ TableName: 'Users', Key: { id: payload.id }}, (error, data) => {
        if (error) {
            return callback('Internal error');
        }

        const user = data.Item;
        callback(null, generatePolicy(user.username, 'Allow', event.methodArn));
    });
};

module.exports = authorize;

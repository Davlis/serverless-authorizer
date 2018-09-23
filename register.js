const uuid = require('uuid');
const dynamoDb = require('serverless-dynamodb-client').doc;

const config = require('./config');

const response = require('./utils/response');
const issueAuthToken = require('./utils/issueAuthToken');
const hashPassword = require('./utils/hashPassword');

const register = (event, context, callback) => {
    const data = JSON.parse(event.body);

    if (!data.username || !data.password) {
        return callback(null, response({ message: 'Validation error' }, 400));
    }

    const params = {
        TableName: 'Users',
        Item: {
            id: uuid.v1(),
            username: data.username,
            password: hashPassword(data.password, config.salt),
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        },
    };

    dynamoDb.put(params, (error) => {
        if (error) {
            return callback(null, response(error, 500));
        }

        const authToken = issueAuthToken(params.Item.id, config);
        const user = params.Item;

        return callback(null, response({ user, authToken }, 200));
    });
};

module.exports = register;
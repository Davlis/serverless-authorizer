const dynamoDb = require('serverless-dynamodb-client').doc;

const config = require('./config');

const response = require('./utils/response');
const issueAuthToken = require('./utils/issueAuthToken');
const hashPassword = require('./utils/hashPassword');

const login = (event, context, callback) => {
    const data = JSON.parse(event.body);

    if (!data.username || !data.password) {
        return callback(null, response({ message: 'Validation error' }, 400));
    }

    const params = {
        TableName: 'Users',
    };

    dynamoDb.scan(params, (error, results) => {
        if (error) {
            return callback(error, response({ message: 'Internal error occured' }, 500));
        }

        const items = results.Items;
        const user = items.find(u => u.username === data.username);
        if (!user) {
            return callback(null, response({ message: 'User with this name not found' }, 404));
        }

        const passhash = hashPassword(data.password, config.salt);
        if (passhash !== user.password) {
            return callback(null, response({ message: 'Invalid password' }, 403));
        }

        const authToken = issueAuthToken(user.id, config);

        callback(null, response({ user, authToken }, 200));
    });
};

module.exports = login;
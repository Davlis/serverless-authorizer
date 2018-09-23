const jwt = require('jsonwebtoken');

const issueToken = (id, type, salt, expiresIn) => {
    return jwt.sign({
        id,
        type,
    }, salt, { expiresIn })
};

module.exports = issueToken;

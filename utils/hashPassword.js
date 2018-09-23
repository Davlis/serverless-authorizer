const { createHmac } = require('crypto');

const hashPassword = (password, salt) => {
    return createHmac('sha512', salt)
        .update(password)
        .digest('hex');
}

module.exports = hashPassword;

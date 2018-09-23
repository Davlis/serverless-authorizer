const config = {
    salt: process.env.SALT || 'lajkonik',
    accessTokenLifetime: process.env.ACCESS_TOKEN_LIFETIME || '1d',
    refreshTokenLifetime: process.env.REFRESH_TOKEN_LIFETIME || '365d',
};

module.exports = config;

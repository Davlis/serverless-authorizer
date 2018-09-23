const issueToken = require('./issueToken');

const TOKEN_TYPES = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
};

const issueAuthToken = (id, authConfig) => {
    return {
        accessToken: issueToken(
            id,
            TOKEN_TYPES.ACCESS_TOKEN,
            authConfig.salt,
            authConfig.accessTokenLifetime
        ),
        refreshToken: issueToken(
            id,
            TOKEN_TYPES.REFRESH_TOKEN,
            authConfig.salt,
            authConfig.refreshTokenLifetime
        ),
        accessTokenExpiresIn: authConfig.accessTokenLifetime,
        refreshTokenExpiresIn: authConfig.refreshTokenLifetime,
    };
};

module.exports = issueAuthToken;

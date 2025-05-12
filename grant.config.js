const HOST = process.env.HOST;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID;
const APPLE_CLIENT_SECRET = process.env.APPLE_CLIENT_SECRET;

const config = {
    defaults: {
        origin: HOST,
        transport: "session",
        state: true,
    },
    facebook: {
        key: FACEBOOK_APP_ID,
        secret: FACEBOOK_APP_SECRET,
        redirect_uri: `${HOST}/connect/facebook/callback`,
        response: ["tokens", "raw", "jwt", "profile"],
        scope: ["public_profile", "email"],
        callback: `/identity/provider/facebook`,
    },
    google: {
        key: GOOGLE_CLIENT_ID,
        secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${HOST}/connect/google/callback`,
        response: ["tokens", "raw", "jwt", "profile"],
        scope: ["openid", "email", "profile"],
        nonce: true,
        custom_params: { access_type: "offline", prompt: "consent" },
        callback: `/identity/provider/google`,
    },
    apple: {
        key: APPLE_CLIENT_ID,
        secret: APPLE_CLIENT_SECRET,
        redirect_uri: `${HOST}/connect/apple/callback`,
        response: ["tokens", "jwt"],
        scope: ["email", "name"],
        scope_delimiter: " ",
        custom_params: { response_mode: "form_post" },
        callback: `/identity/provider/apple`,
    },
};

module.exports = config;

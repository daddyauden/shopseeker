const Config: { [key: string]: string } = {
    APP_NAME: process.env.APP_NAME + "",
    APP_VERSION: process.env.APP_VERSION + "",
    APP_IDENTIFIER: process.env.APP_IDENTIFIER + "",

    HOST: process.env.HOST + "",
    MEDIA_HOST: process.env.MEDIA_HOST + "",
    REST_HOST: process.env.REST_HOST + "",
    IO_HOST: process.env.IO_HOST + "",

    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY + "",

    ENCRYPT_KEY: process.env.ENCRYPT_KEY + "",
    ENCRYPT_IV: process.env.ENCRYPT_IV + "",

    PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER + "",

    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL + "",
};

export default Config;

const { v4 } = require("uuid");

module.exports = {
    env: {
        APP_NAME: process.env.APP_NAME,
        APP_VERSION: process.env.APP_VERSION,
        APP_IDENTIFIER: process.env.APP_IDENTIFIER,

        HOST: process.env.HOST,
        MEDIA_HOST: process.env.MEDIA_HOST,
        REST_HOST: process.env.REST_HOST,
        IO_HOST: process.env.IO_HOST,

        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,

        ENCRYPT_KEY: process.env.ENCRYPT_KEY,
        ENCRYPT_IV: process.env.ENCRYPT_IV,

        PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER,

        SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    },
    distDir: ".next",
    generateBuildId: () => v4().replace("-", ""),
    generateEtags: true,
    pageExtensions: ["tsx", "ts", "jsx", "js"],
    poweredByHeader: false,
    compress: true,
    analyticsId: "",
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        loader: "default",
        path: "/_next/image",
        // loader: "imgix",
        // path: 'https://example.com/myaccount/',
        domains: [process.env.MEDIA_HOST.substring(8)],
        minimumCacheTTL: 60,
    },
    devIndicators: { buildActivity: true },
    basePath: "",
    serverRuntimeConfig: {},
    publicRuntimeConfig: { staticFolder: "/static" },
    reactStrictMode: true,
};

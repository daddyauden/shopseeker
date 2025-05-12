import Config from "config";

export const HOST = Config.HOST;

export const APP_PAGE = "/";
export const SHOP_PAGE = "/shop/[id]";

export const API_SIGNIN = `${HOST}/auth/signin`;
export const API_SIGNUP = `${HOST}/auth/signup`;
export const API_RESET_PASSWORD = `${HOST}/auth/reset-password`;
export const API_FORGOT_PASSWORD = `${HOST}/auth/forgot-password`;

export const MERCHANT_SIGNIN_PAGE = "/merchant";

export const DELIVER_SIGNIN_PAGE = "/deliver";

export const COMMISSION_SIGNIN_PAGE = "/commission";

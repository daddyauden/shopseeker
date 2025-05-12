import {
    isIOS,
    isAndroid,
    isBrowser,
    isMobileOnly,
    isTablet,
    isMacOs,
    isIE,
} from "react-device-detect";

export const IS_IOS = isIOS;

export const IS_IE = isIE;

export const IS_ANDROID = isAndroid;

export const IS_DESKTOP = isBrowser;

export const IS_MOBILE = isMobileOnly;

export const IS_TABLET = isTablet;

export const IS_MACOS = isMacOs;

export const DEVICE_WIDTH = "100vw";

export const DEVICE_HEIGHT = "100vh";

export const WINDOW_WIDTH = "100vw";

export const WINDOW_HEIGHT = "100vh";

export const THEME_MODE = "light";

export const STATUS_BAR_HEIGHT = 44;

export const MENU_BUTTON_WIDTH = 87;

export const MENU_BUTTON_HEIGHT = 32;

export const MENU_BUTTON_TOP = 48;

export const MENU_BUTTON_BOTTOM = MENU_BUTTON_TOP - STATUS_BAR_HEIGHT;

export const MENU_BUTTON_RIGHT = 7;

export const NAVIGATION_BAR_WIDTH = "100vw";

export const NAVIGATION_BAR_HEIGHT =
    MENU_BUTTON_BOTTOM * 2 + MENU_BUTTON_HEIGHT + STATUS_BAR_HEIGHT;

export const DEVICE_LANGUAGE = "en";

/* ================================ */

export const FETCH_LIMIT = 50;

export const PASSWORD_MIN_LENGTH = 8;

export const SEARCH_BAR_HEIGHT = 60;

export const HEADER_BAR_HEIGHT = 60;

export const FOOTER_BAR_HEIGHT = 60;

export const INPUT_HEIGHT = 30;
export const TEXTAREA_HEIGHT = 130;

export const LOCALE_KEY = "UT_PYT_ER";

export const TOKEN_KEY = "token";

export const AUTH_KEY = "_SEU_PE";

export const LOGIN_REDIRECT_KEY = "__RETU__";

export const CART_KEY = "__SEC_UIYHF__";

export const SHIPPING_TYPE_KEY = "__UR_PWLK__";

export const SHIPPING_KEY = "__ODJY__";

export const SHIPPING_TIP_KEY = "__KJRI__ESDP__";

export const PAYMENT_METHOD_TYPE_KEY = "IYB__YEU";

export const PAYMENT_METHOD_KEY = "ISJH__SKIO";

export const MAX_FILES_UPLOAD = 4;

export const MAX_SIZE_UPLOAD = 3145728;

export const ADS_HEIGHT = 130;

export const IMG_WIDTH = 120;

export const IMG_HEIGHT = 120;

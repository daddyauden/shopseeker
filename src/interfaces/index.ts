import * as cart from "./cart";
import * as coupon from "./coupon";
import * as device from "./device";
import * as modal from "./modal";
import * as nav from "./nav";
import * as profile from "./profile";
import * as region from "./region";
import * as router from "./router";

module.exports = {
    ...cart,
    ...coupon,
    ...device,
    ...modal,
    ...nav,
    ...profile,
    ...region,
    ...router,
};

import React, { FC, useState, useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Config from "config";
import { HEADER_BAR_HEIGHT } from "config/constant";

import { Router } from "interfaces/router";

import Div from "components/div";
import Text from "components/text";
import Button from "components/button";
import NoResultFound from "components/no-result";

import Terms from "containers/identity/terms";
import Privacy from "containers/identity/privacy";
import SigninForCart from "containers/identity/signin-for-cart";

import Checkout from "containers/checkout";
import Merchant from "containers/cart/merchant";
import ConfirmOrder from "containers/confirm-order";

import NavBar from "containers/bar/nav-bar";
import HeaderBar from "containers/bar/header-bar";

import { trans } from "locales";

import Style from "style";

const Stripe = loadStripe(Config.STRIPE_PUBLISHABLE_KEY as string);

type Props = {
    router: Router;
    changeRouter: (router: Router) => void;
    [key: string]: any;
};

const ShopCartPage: FC<Props> = (props) => {
    const {
        cart: { merchants },
        profile: { user },
    }: any = useSelector((state) => state);

    const { sub_tab, shop } = props;

    const sub_tabs = [
        "terms",
        "privacy",
        "cart",
        "signin",
        "checkout",
        "confirm",
    ];

    const isLoggedIn: boolean = !!_.get(user, "id");

    const [progress, changeProgress] = useState("cart");

    useEffect(() => {
        let _progress = "cart";

        if (isLoggedIn && sub_tab === "signin") {
            _progress = "checkout";
        } else if (_.includes(sub_tabs, sub_tab)) {
            _progress = sub_tab;
        }

        if (_progress !== progress) {
            changeProgress(_progress);
        }
    }, [sub_tab]);

    const renderView = () => {
        let component: any = null;

        switch (progress) {
            case "terms":
                component = (
                    <Div
                        style={[
                            Style.column,
                            { paddingTop: HEADER_BAR_HEIGHT },
                        ]}
                    >
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerLeft={
                                <NavBar
                                    onClick={() => changeProgress("signin")}
                                    rightNav={
                                        <Text
                                            style={[
                                                Style.f_color_2,
                                                Style.f_weight_500,
                                                Style.f_size_13,
                                            ]}
                                        >
                                            {trans("back")}
                                        </Text>
                                    }
                                />
                            }
                            headerTitle={trans("terms_of_use")}
                        />
                        <Terms />
                    </Div>
                );
                break;

            case "privacy":
                component = (
                    <Div
                        style={[
                            Style.column,
                            { paddingTop: HEADER_BAR_HEIGHT },
                        ]}
                    >
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerLeft={
                                <NavBar
                                    onClick={() => changeProgress("signin")}
                                    rightNav={
                                        <Text
                                            style={[
                                                Style.f_color_2,
                                                Style.f_weight_500,
                                                Style.f_size_13,
                                            ]}
                                        >
                                            {trans("back")}
                                        </Text>
                                    }
                                />
                            }
                            headerTitle={trans("privacy_policy")}
                        />
                        <Privacy />
                    </Div>
                );
                break;

            case "cart":
                component = _.isEmpty(merchants) ? (
                    <Div style={[Style.v_center, Style.h_p100]}>
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerTitle={trans("navlinkCart")}
                        />
                        <NoResultFound />
                    </Div>
                ) : (
                    <Div
                        style={[
                            Style.column,
                            { paddingTop: HEADER_BAR_HEIGHT },
                        ]}
                    >
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerTitle={trans("navlinkCart")}
                        />
                        <Merchant showDelivery={true} />
                        <Button
                            size="fullwidth"
                            onPress={() =>
                                changeProgress(
                                    isLoggedIn ? "checkout" : "signin"
                                )
                            }
                            trans="continue"
                            style={[Style.m_v_4, Style.w_p90]}
                        />
                    </Div>
                );
                break;

            case "signin":
                component = (
                    <Div
                        style={[
                            Style.column,
                            { paddingTop: HEADER_BAR_HEIGHT },
                        ]}
                    >
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerLeft={
                                <NavBar
                                    onClick={() => changeProgress("cart")}
                                    rightNav={
                                        <Text
                                            style={[
                                                Style.f_size_13,
                                                Style.f_color_2,
                                                Style.f_weight_500,
                                            ]}
                                        >
                                            {trans("back")}
                                        </Text>
                                    }
                                />
                            }
                            headerTitle={trans("navlinkCart")}
                        />

                        <SigninForCart
                            merchant={shop}
                            changeNav={(progress) => changeProgress(progress)}
                        />

                        <Button
                            size="fullwidth"
                            onPress={() => changeProgress("checkout")}
                            trans="guestForCheckout"
                            style={[
                                Style.m_t_8,
                                Style.w_p90,
                                Style.p_v_4,
                                Style.bg_color_light_medium,
                            ]}
                            titleStyle={[
                                Style.f_size_16,
                                Style.f_color_dark_medium,
                                Style.f_weight_500,
                            ]}
                        />
                    </Div>
                );
                break;

            case "checkout":
                component = _.isEmpty(merchants) ? (
                    <Div style={[Style.v_center, Style.h_p100]}>
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerTitle={trans("navlinkCart")}
                        />
                        <NoResultFound />
                    </Div>
                ) : (
                    <Div
                        style={[
                            Style.column,
                            Style.h_p100,
                            { paddingTop: HEADER_BAR_HEIGHT },
                        ]}
                    >
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerLeft={
                                <NavBar
                                    onClick={() =>
                                        changeProgress(
                                            isLoggedIn ? "cart" : "signin"
                                        )
                                    }
                                    rightNav={
                                        <Text
                                            style={[
                                                Style.f_size_13,
                                                Style.f_color_2,
                                                Style.f_weight_500,
                                            ]}
                                        >
                                            {trans("back")}
                                        </Text>
                                    }
                                />
                            }
                            headerTitle={trans("navlinkCart")}
                        />

                        <Checkout
                            {...props}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                        />
                    </Div>
                );
                break;

            case "confirm":
                component = _.isEmpty(merchants) ? (
                    <Div style={[Style.v_center, Style.h_p100]}>
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerTitle={trans("navlinkCart")}
                        />
                        <NoResultFound />
                    </Div>
                ) : (
                    <Div
                        style={[
                            Style.column,
                            { paddingTop: HEADER_BAR_HEIGHT },
                        ]}
                    >
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerLeft={
                                <NavBar
                                    onClick={() => changeProgress("checkout")}
                                    rightNav={
                                        <Text
                                            style={[
                                                Style.f_color_2,
                                                Style.f_weight_500,
                                                Style.f_size_13,
                                            ]}
                                        >
                                            {trans("back")}
                                        </Text>
                                    }
                                />
                            }
                            headerTitle={trans("navlinkCart")}
                        />
                        <Elements stripe={Stripe}>
                            <ConfirmOrder
                                {...props}
                                merchant={shop}
                                updateCartProgress={(progress: string) =>
                                    changeProgress(progress)
                                }
                            />
                        </Elements>
                    </Div>
                );
                break;
        }
        return component;
    };

    return (
        <Div style={[Style.column, Style.overflow_y_auto, Style.h_p100]}>
            {renderView()}
        </Div>
    );
};

export default ShopCartPage;

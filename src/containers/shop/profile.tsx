import React, { FC, useState } from "react";
import _ from "lodash";

import { HEADER_BAR_HEIGHT } from "config/constant";

import { goToShop, getShopUrl } from "utils/navigation";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import NavBar from "containers/bar/nav-bar";
import HeaderBar from "containers/bar/header-bar";

import Terms from "containers/identity/terms";
import Privacy from "containers/identity/privacy";
import Signup from "containers/identity/signup";
import Signin from "containers/identity/signin";
import ForgotPassword from "containers/identity/forgot-password";

import Login from "containers/identity/login";

import Order from "containers/order";
import Profile from "containers/profile";
import ProfileNavBar from "containers/profile/navbar";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const ShopProfilePage: FC<Props> = (props) => {
    const progresses = [
        "terms",
        "privacy",
        "signin",
        "signup",
        "forgot-password",
    ];

    const { sub_tab: tab, user, shop } = props;

    const isLoggedIn: boolean = !!_.get(user, "id");

    const _progress = !isLoggedIn
        ? _.includes(progresses, tab)
            ? tab
            : "signin"
        : _.includes(["profile", "order"], tab)
        ? tab
        : "profile";

    const [progress, setProgress] = useState(_progress);

    const changeProgress = (_progress) => {
        if (_progress !== progress) {
            setProgress(_progress);
        }
    };

    const renderView = () => {
        let component: any = null;

        switch (progress) {
            case "terms":
                component = (
                    <>
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerLeft={
                                <NavBar
                                    onClick={() => changeProgress("signin")}
                                    rightNav={
                                        <Text
                                            style={[
                                                Style.f_size_13,
                                                Style.f_color_2,
                                                Style.f_weight_500,
                                            ]}
                                        >
                                            {trans("signin")}
                                        </Text>
                                    }
                                />
                            }
                            headerRight={
                                <A onPress={() => changeProgress("signup")}>
                                    <Text
                                        style={[
                                            Style.f_size_13,
                                            Style.f_color_2,
                                            Style.f_weight_500,
                                            Style.m_r_1,
                                        ]}
                                    >
                                        {trans("signup")}
                                    </Text>
                                    <Icon
                                        name="chevron-forward"
                                        size={Style.f_size_15.fontSize}
                                        color={Style.f_color_2.color}
                                    />
                                </A>
                            }
                            headerTitle={trans("terms_of_use")}
                        />
                        <Div
                            style={[
                                {
                                    paddingTop: `${HEADER_BAR_HEIGHT}px`,
                                },
                                Style.overflow_y_auto,
                            ]}
                        >
                            <Terms />
                        </Div>
                    </>
                );
                break;

            case "privacy":
                component = (
                    <>
                        <HeaderBar
                            style={[Style.bg_color_15, Style.shadow_bottom]}
                            headerLeft={
                                <NavBar
                                    onClick={() => changeProgress("signin")}
                                    rightNav={
                                        <Text
                                            style={[
                                                Style.f_size_13,
                                                Style.f_color_2,
                                                Style.f_weight_500,
                                            ]}
                                        >
                                            {trans("signin")}
                                        </Text>
                                    }
                                />
                            }
                            headerRight={
                                <A onPress={() => changeProgress("signup")}>
                                    <Text
                                        style={[
                                            Style.f_size_13,
                                            Style.f_color_2,
                                            Style.f_weight_500,
                                            Style.m_r_1,
                                        ]}
                                    >
                                        {trans("signup")}
                                    </Text>
                                    <Icon
                                        name="chevron-forward"
                                        size={Style.f_size_15.fontSize}
                                        color={Style.f_color_2.color}
                                    />
                                </A>
                            }
                            headerTitle={trans("privacy_policy")}
                        />
                        <Div
                            style={[
                                {
                                    paddingTop: `${HEADER_BAR_HEIGHT}px`,
                                },
                                Style.overflow_y_auto,
                            ]}
                        >
                            <Privacy />
                        </Div>
                    </>
                );
                break;

            case "signin":
                component = (
                    <Div style={[Style.column, Style.row_center, Style.h_p100]}>
                        <Signin
                            {...props}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                            callback={{
                                success: () => goToShop(shop.id),
                            }}
                        />

                        <Login
                            {...props}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                            callback={getShopUrl(shop.id)}
                        />

                        <Div style={[Style.h_center, Style.m_t_4]}>
                            <A onPress={() => changeProgress("signup")}>
                                <Text
                                    style={[
                                        Style.f_size_15,
                                        Style.f_color_dark,
                                    ]}
                                >
                                    {trans("dontHaveAccount")}
                                </Text>
                                <Text
                                    style={[
                                        Style.f_size_15,
                                        Style.f_weight_500,
                                        Style.underline,
                                        Style.m_l_2,
                                    ]}
                                >
                                    {trans("signup")}
                                </Text>
                            </A>
                        </Div>

                        <Div style={[Style.h_center, Style.m_t_4]}>
                            <A
                                onPress={() =>
                                    changeProgress("forgot-password")
                                }
                            >
                                <Text
                                    style={[
                                        Style.f_size_15,
                                        Style.f_color_dark,
                                        Style.underline,
                                    ]}
                                >
                                    {trans("forgotPassword")}
                                </Text>
                            </A>
                        </Div>
                    </Div>
                );
                break;

            case "signup":
                component = (
                    <Div style={[Style.column, Style.row_center, Style.h_p100]}>
                        <Signup
                            {...props}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                            callback={{
                                success: () =>
                                    goToShop(shop.id, { tab: "profile" }),
                            }}
                        />

                        <Div style={[Style.h_center, Style.m_t_4]}>
                            <A onPress={() => changeProgress("signin")}>
                                <Text
                                    style={[
                                        Style.f_size_15,
                                        Style.f_color_dark,
                                    ]}
                                >
                                    {trans("alreadyHaveAccount")}
                                </Text>
                                <Text
                                    style={[
                                        Style.f_size_15,
                                        Style.f_weight_500,
                                        Style.underline,
                                        Style.m_l_2,
                                    ]}
                                >
                                    {trans("signin")}
                                </Text>
                            </A>
                        </Div>
                    </Div>
                );
                break;

            case "forgot-password":
                component = (
                    <Div style={[Style.column, Style.row_center, Style.h_p100]}>
                        <ForgotPassword />

                        <Div
                            style={[Style.h_center, Style.m_t_4]}
                            onClick={() => changeProgress("signin")}
                        >
                            <Text style={[Style.f_size_15, Style.f_color_dark]}>
                                {trans("alreadyHaveAccount")}
                            </Text>
                            <Text
                                style={[
                                    Style.f_size_15,
                                    Style.f_weight_500,
                                    Style.underline,
                                    Style.m_l_1,
                                ]}
                            >
                                {trans("signin")}
                            </Text>
                        </Div>
                    </Div>
                );
                break;

            case "profile":
                component = (
                    <Div
                        style={[
                            Style.column,
                            Style.h_p100,
                            Style.p_h_2,
                            {
                                paddingTop: HEADER_BAR_HEIGHT,
                            },
                        ]}
                    >
                        <ProfileNavBar
                            {...props}
                            currentNav={progress}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                        />
                        <Profile {...props} />
                    </Div>
                );
                break;

            case "order":
                component = (
                    <Div
                        style={[
                            Style.column,
                            Style.h_p100,
                            Style.p_h_2,
                            {
                                paddingTop: HEADER_BAR_HEIGHT,
                            },
                        ]}
                    >
                        <ProfileNavBar
                            {...props}
                            currentNav={progress}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                        />
                        <Order {...props} />
                    </Div>
                );
                break;
        }

        return component;
    };

    return renderView();
};

export default ShopProfilePage;

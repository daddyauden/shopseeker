import React, { FC, useState } from "react";
import _ from "lodash";

import { APP_PAGE } from "config/route";
import { HEADER_BAR_HEIGHT } from "config/constant";

import { goToApp } from "utils/navigation";

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
import ResetPassword from "containers/identity/reset-password";
import EmailConfirmation from "containers/identity/email-confirmation";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const IdentityPage: FC<Props> = (props) => {
    const progresses = [
        "terms",
        "privacy",
        "signin",
        "signup",
        "forgot-password",
        "email-confirmation",
        "reset-password",
    ];

    const {
        device: { isMobile },
        query,
    } = props;

    const tab = _.get(query, "tab", "signin");

    const _progress = _.includes(progresses, tab) ? tab : "signin";

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
                    <>
                        <HeaderBar
                            style={[
                                Style.bg_color_15,
                                {
                                    height: `${HEADER_BAR_HEIGHT}px`,
                                },
                            ]}
                        />

                        <Signin
                            {...props}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                            callback={{
                                success: () => goToApp(),
                                fail: () => {},
                            }}
                        />

                        <Login
                            {...props}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                            callback={APP_PAGE}
                        />

                        <Div
                            onClick={() => changeProgress("signup")}
                            style={[Style.h_center, Style.p_4]}
                        >
                            <Text style={[Style.f_size_15, Style.f_color_dark]}>
                                {trans("dontHaveAccount")}
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
                            </Text>
                        </Div>

                        <Div
                            onClick={() => changeProgress("forgot-password")}
                            style={[Style.h_center, Style.p_4]}
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
                        </Div>
                    </>
                );
                break;

            case "signup":
                component = (
                    <>
                        <HeaderBar
                            style={[
                                Style.bg_color_15,
                                {
                                    height: `${HEADER_BAR_HEIGHT}px`,
                                },
                            ]}
                        />

                        <Signup
                            {...props}
                            changeNav={(progress: string) =>
                                changeProgress(progress)
                            }
                            callback={{
                                success: () => goToApp(),
                                fail: () => {},
                            }}
                        />

                        <Div
                            onClick={() => changeProgress("signin")}
                            style={[Style.h_center, Style.p_4]}
                        >
                            <Text style={[Style.f_size_15, Style.f_color_dark]}>
                                {trans("alreadyHaveAccount")}
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
                            </Text>
                        </Div>
                    </>
                );
                break;

            case "forgot-password":
                component = (
                    <>
                        <HeaderBar
                            style={[
                                Style.bg_color_15,
                                {
                                    height: `${HEADER_BAR_HEIGHT}px`,
                                },
                            ]}
                        />

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
                    </>
                );
                break;

            case "email-confirmation":
                component = <EmailConfirmation />;
                break;

            case "reset-password":
                component = (
                    <ResetPassword
                        {...props}
                        changeNav={(progress: string) =>
                            changeProgress(progress)
                        }
                    />
                );
                break;
        }

        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <Div
                    style={[
                        Style.column,
                        Style.row_center,
                        isMobile
                            ? { width: "100%", height: "100%" }
                            : { width: "390pt", height: "570pt" },
                        Style.position_relative,
                    ]}
                >
                    {component}
                </Div>
            </Div>
        );
    };

    return renderView();
};

export default IdentityPage;

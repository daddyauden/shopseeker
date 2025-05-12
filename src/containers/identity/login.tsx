import _ from "lodash";
import React, { FC } from "react";
import { connect } from "react-redux";

import { APP_PAGE } from "config/route";

import { LOGIN_REDIRECT_KEY } from "config/constant";

import { login as loginAction } from "actions/auth";

import { encrypt } from "helpers/encrypt";
import { setLocalState } from "helpers/storage";

import A from "components/a";
import Div from "components/div";
import Text from "components/text";
import Image from "components/image";

import { trans } from "locales";

import Style from "style";

import GoogleLogo from "assets/icon/google.png";
import AppleLogo from "assets/icon/apple.png";
import FacebookLogo from "assets/icon/facebook.png";

type Props = {
    [key: string]: any;
};

const Login: FC<Props> = (props) => {
    const { changeNav, login, callback } = props;

    const _redirect_url = encrypt(callback || APP_PAGE);

    const _login = (provider) => {
        setLocalState(LOGIN_REDIRECT_KEY, _redirect_url);
        login(provider);
    };

    return (
        <Div style={[Style.column, Style.p_h_4]}>
            <Div style={[Style.v_center, Style.b_b_light_medium]}>
                <Text
                    style={[
                        Style.bg_color_15,
                        Style.f_size_13,
                        Style.f_color_6,
                        Style.f_weight_500,
                        Style.p_h_2,
                        Style.position_relative,
                        {
                            bottom: -10,
                        },
                    ]}
                >
                    {trans("or")}
                </Text>
            </Div>

            <Div style={[Style.h_center, Style.m_t_6]}>
                <Div
                    onClick={() => _login("apple")}
                    style={[
                        Style.m_h_2,
                        {
                            width: "40px",
                            height: "40px",
                        },
                    ]}
                >
                    <Image
                        src={AppleLogo}
                        layout="responsive"
                        objectFit="contain"
                    />
                </Div>
                <Div
                    onClick={() => _login("google")}
                    style={[
                        Style.m_h_2,
                        {
                            width: "36px",
                            height: "36px",
                        },
                    ]}
                >
                    <Image
                        src={GoogleLogo}
                        layout="responsive"
                        objectFit="contain"
                    />
                </Div>
                <Div
                    onClick={() => _login("facebook")}
                    style={[
                        Style.m_h_2,
                        {
                            width: "36px",
                            height: "36px",
                        },
                    ]}
                >
                    <Image
                        src={FacebookLogo}
                        layout="responsive"
                        objectFit="contain"
                    />
                </Div>
            </Div>

            <Div
                style={[
                    Style.row,
                    Style.row_start,
                    Style.column_center,
                    Style.wrap,
                    Style.m_t_6,
                ]}
            >
                <Text
                    style={[
                        Style.f_size_15,
                        Style.f_color_6,
                        Style.l_h_5,
                        Style.white_space_normal,
                        Style.word_break_all,
                    ]}
                >
                    {trans("eula_1", {
                        title: `${trans("apple")}, ${trans("google")}, ${trans(
                            "facebook"
                        )}`,
                    })}
                    <A
                        onPress={() => changeNav("terms")}
                        style={[
                            Style.f_size_15,
                            Style.f_color_first,
                            Style.f_weight_500,
                            Style.l_h_5,
                            Style.underline,
                            Style.m_h_1,
                        ]}
                    >
                        {trans("terms_of_use")}
                    </A>
                    {trans("eula_2")}
                    <A
                        onPress={() => changeNav("privacy")}
                        style={[
                            Style.f_size_15,
                            Style.f_color_first,
                            Style.f_weight_500,
                            Style.l_h_5,
                            Style.underline,
                            Style.m_h_1,
                        ]}
                    >
                        {trans("privacy_policy")}
                    </A>
                </Text>
            </Div>
        </Div>
    );
};

const mapStateToProps = (state: any) => ({
    locale: state.system.locale,
});

const mapDispatchToProps = (dispatch: any) => ({
    login: (provider: string) => dispatch(loginAction(provider)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

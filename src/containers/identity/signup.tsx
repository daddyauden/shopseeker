import React, { FC, useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { signup as signupAction } from "actions/auth";

import Lib from "helpers/lib";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Input from "components/input";
import Button from "components/button";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const Signup: FC<Props> = (props) => {
    const [showAsterisks, setShowAsterisks] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailValid = Lib.isValidEmail(email);
    const passwordValid = password !== "";

    const { type, signup, changeNav, callback } = props;

    const submit = () => {
        signup(
            {
                email,
                password,
                username: Lib.c2c(Lib.uuidv4()),
                type,
                provider: "local",
            },
            callback
        );
    };

    return (
        <Div style={[Style.column, Style.p_4]}>
            <Text
                style={[
                    Style.f_size_15,
                    Style.f_color_3,
                    Style.f_weight_500,
                    Style.m_b_4,
                    Style.text_center,
                ]}
            >
                {type === "merchant"
                    ? trans("signupMerchant")
                    : type === "deliver"
                    ? trans("signupDeliver")
                    : trans("signupTitle")}
            </Text>

            <Input
                name="email"
                value={email}
                editable={true}
                autoCapitalize="none"
                placeholder={trans("emailPlaceholder")}
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
            />

            <Div
                style={[
                    Style.position_relative,
                    Style.row,
                    Style.m_v_3,
                    Style.bg_color_gray,
                    Style.border_round_1,
                ]}
            >
                <Input
                    name="password"
                    value={password}
                    secureTextEntry={showAsterisks}
                    editable={emailValid}
                    autoCapitalize="none"
                    placeholder={trans("passwordPlaceholder")}
                    onChangeText={(password) => setPassword(password)}
                    innerStyle={{ ...Style.p_r_7 }}
                />
                <Div
                    style={[
                        Style.right_vertical,
                        Style.v_center,
                        {
                            width: "50px",
                        },
                    ]}
                >
                    <A onPress={() => setShowAsterisks(!showAsterisks)}>
                        {showAsterisks === true ? (
                            <Icon
                                name="eye-outline"
                                size={Style.f_size_20.fontSize}
                                color={Style.f_color_5.color}
                            />
                        ) : (
                            <Icon
                                name="eyeoff-outline"
                                size={Style.f_size_20.fontSize}
                                color={Style.f_color_5.color}
                            />
                        )}
                    </A>
                </Div>
            </Div>

            <Button
                size="fullwidth"
                title={trans("signup")}
                onPress={() => submit()}
                disabled={!emailValid || !passwordValid}
            />

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
                    {trans("eula_1", { title: trans("signup") })}
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

Signup.defaultProps = {
    type: "account",
};

const mapStateToProps = (state: any) => ({
    locale: state.system.locale,
});

const mapDispatchToProps = (dispatch: any) => ({
    signup: (data: object, callback: any) =>
        dispatch(signupAction(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

import React, { FC, useState } from "react";
import _ from "lodash";
import * as yup from "yup";
import { connect } from "react-redux";
import { PASSWORD_MIN_LENGTH } from "config/constant";

import { resetPassword } from "request/user";

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

const ResetPassword: FC<Props> = (props) => {
    const [showAsterisks, setShowAsterisks] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [status, setStatus] = useState("failed");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { changeNav } = props;

    if (_.get(props, "query.code", "") === "") {
        return (
            <Div style={[Style.column, Style.p_4]}>
                <Div style={[Style.v_center]}>
                    <Icon
                        name="alert"
                        size={80}
                        color={Style.f_color_warning.color}
                    />
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_color_dark,
                            Style.m_v_4,
                        ]}
                    >
                        {trans("sendResetPasswordExpire")}
                    </Text>
                    <A onPress={() => changeNav("signin")}>
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
    }

    const passwordValidator = yup
        .string()
        .min(PASSWORD_MIN_LENGTH, "atLeast8Characters")
        .matches(/[~!@#$%^&*()_+`\-={}:";'<>?,.\/]/, "containsASymbol")
        .matches(/\d/, "containsANumber")
        .required();

    const validatePassword = async (password: string) => {
        try {
            return await passwordValidator.validate(password);
        } catch (error) {
            return error;
        }
    };

    const updatePassword = async (password: string) => {
        setPassword(_.trim(password));

        const passwordIsValid = await validatePassword(password);

        if (_.has(passwordIsValid, "errors")) {
            setError(trans(_.get(passwordIsValid, "message")));
        } else {
            setError("");
        }
    };

    const updateConfirmationPassword = async (passwordConfirmation: string) => {
        setPasswordConfirmation(_.trim(passwordConfirmation));

        if (!_.isEqual(passwordConfirmation, password)) {
            setError(trans("passwordsDontmatch"));
        } else {
            setError("");
        }
    };

    const submit = async () => {
        const res = await resetPassword({
            password,
            passwordConfirmation,
            code: _.get(props, "query.code"),
        });

        if (_.has(res, "jwt") && _.has(res, "user")) {
            setStatus("succeeded");
            setMessage(trans("succeeded"));
        } else if (_.has(res, "error")) {
            setMessage(trans(res.message[0].messages[0].id));
        } else {
            setMessage(trans("failed"));
        }
    };

    return message !== "" ? (
        <Div style={[Style.column, Style.p_4]}>
            <Div style={[Style.v_center]}>
                {status === "succeeded" ? (
                    <Icon
                        name="checkmark-circle"
                        size={80}
                        color={Style.f_color_success.color}
                    />
                ) : (
                    <Icon
                        name="close-circle"
                        size={80}
                        color={Style.f_color_danger.color}
                    />
                )}
                <Text style={[Style.f_size_13, Style.m_t_2]}>{message}</Text>
                {status !== "succeeded" && (
                    <A onPress={() => changeNav("forgot-password")}>
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_color_dark,
                                Style.underline,
                            ]}
                        >
                            {trans("resetPassword")}
                        </Text>
                    </A>
                )}
            </Div>
        </Div>
    ) : (
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
                {trans("updatePassword")}
            </Text>

            <Text style={[Style.f_size_13, Style.m_b_6]}>
                {trans("passwordCondition")}
            </Text>

            <Input
                name="password"
                value={password}
                secureTextEntry={showAsterisks}
                autoCapitalize="none"
                placeholder={trans("passwordPlaceholder")}
                onChangeText={(password) => updatePassword(password)}
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
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    secureTextEntry={showAsterisks}
                    autoCapitalize="none"
                    placeholder={trans("passwordConfirmationPlaceholder")}
                    onChangeText={(password) =>
                        updateConfirmationPassword(password)
                    }
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

            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.m_b_2,
                    { height: "15px" },
                ]}
            >
                {error !== "" && password !== "" && (
                    <>
                        <Icon
                            name="close"
                            size={Style.f_size_15.fontSize}
                            color={Style.f_color_danger.color}
                        />
                        <Text
                            style={[
                                Style.f_size_10,
                                Style.f_color_danger,
                                Style.f_weight_500,
                                Style.m_l_1,
                            ]}
                        >
                            {error}
                        </Text>
                    </>
                )}
            </Div>

            <Button
                size="fullwidth"
                title={trans("update")}
                onPress={submit}
                disabled={
                    error !== "" ||
                    password === "" ||
                    password !== passwordConfirmation
                }
            />
        </Div>
    );
};

const mapStateToProps = (state: any) => ({
    locale: state.system.locale,
});

export default connect(mapStateToProps)(ResetPassword);

import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { changeLocale as changeLocaleAction } from "actions/system";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import { LANGUAGES, trans } from "locales";

import Style from "style";

const LanguageSwitcher = ({ changeLocale }) => {
    const [showSwitcher, setShowSwitcher] = useState(false);

    return (
        <Div style={[Style.position_fixed, Style.v_center]}>
            <A
                onPress={() => setShowSwitcher(!showSwitcher)}
                style={[Style.h_center]}
            >
                <Icon
                    name="language"
                    size={Style.f_size_25.fontSize}
                    color={Style.f_color_dark_medium.color}
                />
            </A>
            {showSwitcher && (
                <Div
                    style={[
                        Style.v_center,
                        Style.bg_color_light,
                        Style.shadow_all,
                        Style.p_2,
                        Style.border_round_1,
                        Style.top_right,
                        {
                            right: "-15px",
                            top: "30px",
                        },
                    ]}
                >
                    {_.map(
                        _.keys(LANGUAGES),
                        (language: string, index: number) => {
                            return (
                                <A
                                    key={index}
                                    style={[Style.v_center, Style.p_2]}
                                    onPress={() => {
                                        changeLocale(language);
                                    }}
                                >
                                    <Text
                                        style={[
                                            Style.f_size_13,
                                            Style.f_color_dark_medium,
                                            Style.f_weight_500,
                                            Style.white_space_nowrap,
                                        ]}
                                    >
                                        {trans(`locale_${language}`)}
                                    </Text>
                                </A>
                            );
                        }
                    )}
                </Div>
            )}
        </Div>
    );
};

const mapStateToProps = (state) => {
    return {
        locale: state.system.locale,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLocale: (locale) => dispatch(changeLocaleAction(locale)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);

import React, { FC, ReactNode } from "react";
import _ from "lodash";

import Div from "components/div";
import Text from "components/text";
import { Loader } from "components/content-loader";

import { trans as _trans } from "locales";

import Style from "style";

type Props = {
    size?: "big" | "medium" | "small" | "fullwidth";
    disabled?: boolean;
    loading?: boolean;
    onPress?: Function;
    trans?: string;
    title?: string | ReactNode;
    titleStyle?: any;
    style?: object[];
};

const ButtonView: FC<Props> = (props) => {
    const {
        size,
        disabled,
        loading,
        onPress,
        trans,
        title,
        style,
        titleStyle,
    } = props;

    const _title = trans ? _trans(trans) : title || "";

    let wrapperStyle = {
        ...Style.h_center,
        ...Style.w_auto,
        ...Style.p_v_1,
        ...Style.p_h_2,
        ...Style.border_round_1,
        ...Style.bg_color_primary,
        ...Style.outline_hide,
    };

    let innerStyle = {
        ...Style.f_size_14,
        ...Style.f_weight_500,
        ...Style.f_color_15,
    };

    if (disabled) {
        wrapperStyle = {
            ...wrapperStyle,
            ...Style.bg_color_light_dark,
        };

        innerStyle = { ...innerStyle, ...Style.f_color_dark_light };
    }

    if (size === "fullwidth") {
        wrapperStyle = {
            ...wrapperStyle,
            ...Style.p_v_2,
            ...Style.w_p100,
        };
    } else if (size === "big") {
        wrapperStyle = {
            ...wrapperStyle,
            ...Style.p_v_2,
        };
    } else if (size === "medium") {
        wrapperStyle = {
            ...wrapperStyle,
            ...Style.p_v_1,
        };
    }

    return (
        <Div style={[Style.v_center]}>
            <Div
                style={[
                    wrapperStyle,
                    _.reduce(
                        style,
                        (_style, stl) => {
                            _style = { ..._style, ...stl };
                            return _style;
                        },
                        {}
                    ),
                    disabled && Style.cursor_not_allowed,
                ]}
                onClick={
                    disabled || loading
                        ? () => {}
                        : (event) => {
                              event.preventDefault();
                              event.stopPropagation();

                              onPress && onPress();
                          }
                }
            >
                <Text
                    style={[
                        innerStyle,
                        _.reduce(
                            titleStyle,
                            (_style, stl) => {
                                _style = { ..._style, ...stl };
                                return _style;
                            },
                            {}
                        ),
                    ]}
                >
                    {_title}
                </Text>
                {loading && (
                    <Loader
                        style={[
                            {
                                width: "15px",
                                height: "15px",
                                marginLeft: "10px",
                            },
                        ]}
                    />
                )}
            </Div>
        </Div>
    );
};

export default ButtonView;

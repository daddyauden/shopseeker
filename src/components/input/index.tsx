import React, { FC, useState, CSSProperties } from "react";
import _ from "lodash";

import { trans } from "locales";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Label from "components/label";

import Style from "style";

const Input = (props) => {
    let _style: CSSProperties = {
        ...Style.input,
    };

    if (_.has(props, "style")) {
        _style = {
            ..._style,
            ...props.style,
        };
    }

    let _className = "";

    if (_.get(props, "className")) {
        if (_.isArray(props.className)) {
            _className = _.join(props.className, " ");
        } else if (_.isString(props.className)) {
            _className = _.toString(props.className);
        }
    }

    return (
        <Div style={[Style.row, Style.column_center, Style.w_p100]}>
            {_.get(props, "disabled") === true && (
                <Icon
                    name="disable"
                    size={Style.f_size_15.fontSize}
                    color={Style.f_color_dark.color}
                    style={[Style.m_l_1]}
                />
            )}
            <input
                {..._.omit(props, ["style", "children"])}
                className={_className}
                style={_style}
            />
        </Div>
    );
};

type Props = {
    onChangeText?: Function;
    onFocus?: Function;
    onBlur?: Function;
    ref?: any;
    secureTextEntry?: boolean;
    keyboardType?:
        | "none"
        | "default"
        | "phone-pad"
        | "email-address"
        | "decimal-pad"
        | "numeric"
        | "web-search";
    editable?: boolean;
    disabled?: boolean;
    autoCapitalize?:
        | "none"
        | "upper"
        | "lower"
        | "sentences"
        | "words"
        | "characters";
    autoComplete?: "on" | "off";
    autoCorrect?: boolean;
    autoFocus?: boolean;
    type?: string;
    required?: boolean;
    id?: string;
    name?: string;
    value?: any;
    placeholder?: string;
    label?: string;
    labelTrans?: string;
    labelStyle?: object[];
    note?: string;
    noteTrans?: string;
    noteStyle?: object[];
    style?: object[];
    innerStyle?: object;
    className?: string | [];
    innerClassName?: string | [];
    checked?: boolean;
};

const InputView: FC<Props> = (props) => {
    let _containerStyle = {
        ...Style.w_p100,
        ...Style.row,
        ...Style.row_start,
        ...Style.column_start,
        ...Style.bg_color_light,
        ...Style.border_round_1,
    };

    if (_.has(props, "style")) {
        if (_.isArray(props.style)) {
            _.forEach(props.style, (value) => {
                _containerStyle = {
                    ..._containerStyle,
                    ...value,
                };
            });
        } else if (_.isPlainObject(props.style)) {
            _containerStyle = {
                ..._containerStyle,
                ...props.style,
            };
        }
    }

    let _innerStyle = _.get(props, "innerStyle", {});

    let _containerClassName = "";

    if (_.get(props, "className")) {
        if (_.isArray(props.className)) {
            _containerClassName = _.join(props.className, " ");
        } else if (_.isString(props.className)) {
            _containerClassName = _.toString(props.className);
        }
    }

    const [_value, _setValue] = useState(
        !_.isNil(_.get(props, "value")) ? _.get(props, "value") : ""
    );

    let _label = _.get(props, "label", "");

    if (_.has(props, "labelTrans") && props.labelTrans) {
        _label = trans(props.labelTrans);
    }

    let _note = _.get(props, "note", "");

    if (_.has(props, "noteTrans") && props.noteTrans) {
        _note = trans(props.noteTrans);
    }

    const _id = _.get(props, "id", _.get(props, "name", ""));

    const _type = _.get(props, "secureTextEntry", false)
        ? "password"
        : _.get(props, "type", "text");

    const _disabled = _.get(props, "disabled", !_.get(props, "editable", true));

    if (_disabled) {
        _containerStyle = {
            ..._containerStyle,
            ...Style.bg_color_light,
        };

        _innerStyle = {
            ..._innerStyle,
            ...Style.f_color_dark_light,
        };
    }

    let _inputMode = _.get(props, "keyboardType", "text");

    if (_inputMode === "default") {
        _inputMode = "text";
    } else if (_inputMode === "phone-pad") {
        _inputMode = "tel";
    } else if (_inputMode === "email-address") {
        _inputMode = "email";
    } else if (_inputMode === "decimal-pad") {
        _inputMode = "decimal";
    } else if (_inputMode === "web-search") {
        _inputMode = "search";
    }

    const _onChange = (e: any) => {
        let currentValue: any = e.target.value;

        const _autoCapitalize = _.get(props, "autoCapitalize", "none");

        if (_autoCapitalize === "upper") {
            currentValue = _.toUpper(currentValue);
        } else if (_autoCapitalize === "lower") {
            currentValue = _.toLower(currentValue);
        } else if (_autoCapitalize === "sentences") {
            currentValue = _.capitalize(currentValue);
        } else if (_autoCapitalize === "words") {
            currentValue = _.startCase(currentValue);
        } else if (_autoCapitalize === "characters") {
            currentValue = _.upperCase(currentValue);
        }

        _setValue(currentValue);

        props.onChangeText && props.onChangeText(currentValue);
    };

    return (
        <Div className={_containerClassName} style={_containerStyle}>
            {_label !== "" && <Label style={props.labelStyle}>{_label}</Label>}
            <Input
                ref={_.get(props, "ref", undefined)}
                id={_id}
                value={_value}
                type={_type}
                placeholder={props.placeholder}
                disabled={_disabled}
                required={!_disabled}
                inputMode={_inputMode}
                onChange={_onChange}
                onFocus={_.get(props, "onFocus", () => {})}
                onBlur={_.get(props, "onBlur", () => {})}
                autoComplete={_.get(props, "autoComplete", "on")}
                autoCorrect={_.get(props, "autoCorrect", true) ? "on" : "off"}
                autoFocus={_.get(props, "autoFocus", false)}
                style={_innerStyle}
                className={_.get(props, "innerClassName", "")}
                checked={_.get(props, "checked", false)}
            />
            {_note !== "" && <Text style={props.labelStyle}>{_note}</Text>}
        </Div>
    );
};

export default InputView;

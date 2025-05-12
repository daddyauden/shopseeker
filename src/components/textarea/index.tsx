import React, { FC, useState } from "react";
import _ from "lodash";
import { Input } from "antd";

const { TextArea } = Input;

import { trans } from "locales";

import Div from "components/div";
import Text from "components/text";
import Label from "components/label";

import Style from "style";

type Props = {
    onChangeText?: Function;
    ref?: any;
    editable?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
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
    innerStyle?: object[];
    className?: string | [];
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

    const _disabled =
        _.get(props, "disabled", false) || !_.get(props, "editable", true);

    if (_disabled) {
        _containerStyle = {
            ..._containerStyle,
            ...Style.b_light,
        };

        _innerStyle = {
            ..._innerStyle,
            ...Style.f_size_13,
            ...Style.f_color_dark_light,
        };
    }

    const _required = _.get(props, "required", true);

    const _onChange = (e: any) => {
        let currentValue: any = e.target.value;

        _setValue(currentValue);

        props.onChangeText && props.onChangeText(currentValue);
    };

    return (
        <Div className={_containerClassName} style={_containerStyle}>
            {_label !== "" && <Label style={props.labelStyle}>{_label}</Label>}
            <TextArea
                ref={_.get(props, "ref", undefined)}
                id={_id}
                value={_value}
                placeholder={props.placeholder}
                disabled={_disabled}
                required={_required}
                onChange={_onChange}
                autoComplete={_.get(props, "autoComplete", "on")}
                autoCorrect={_.get(props, "autoCorrect", true) ? "on" : "off"}
                autoFocus={_.get(props, "autoFocus", false)}
                style={_innerStyle}
                autoSize={{ minRows: 3, maxRows: 5 }}
                bordered={false}
            />
            {_note !== "" && <Text style={props.labelStyle}>{_note}</Text>}
        </Div>
    );
};

export default InputView;

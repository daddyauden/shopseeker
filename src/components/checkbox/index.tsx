import React, { FC, useState } from "react";
import _ from "lodash";

import Div from "components/div";
import Icon from "components/icon";

import Style from "style";

type CheckBoxProps = {
    id?: any;
    onChangeText: Function;
    disabled?: boolean;
    labelText?: string;
    className?: string;
    htmlFor?: any;
    value?: any;
    style?: object[];
    labelPosition?: "left" | "right";
    ref?: any;
    [key: string]: any;
};

const CheckBox: FC<CheckBoxProps> = ({
    className,
    onChangeText,
    labelText,
    style,
    value,
    id,
    htmlFor,
    labelPosition = "right",
    disabled = false,
    ref,
    ...props
}) => {
    const [state, setState] = useState(!!value);

    let _containerStyle = {};

    if (_.has(props, "style")) {
        if (_.isArray(style)) {
            _.forEach(style, (value) => {
                _containerStyle = {
                    ..._containerStyle,
                    ...value,
                };
            });
        } else if (_.isPlainObject(style)) {
            _containerStyle = {
                ..._containerStyle,
                ...style,
            };
        }
    }

    // onChange handler
    const handleOnChange = (e: any) => {
        let currentValue: any = e.target.checked;
        setState(currentValue);
        onChangeText(currentValue);
    };

    // Add all classs to an array
    const addAllClasses = ["checkboxWrapper"];

    // Add label position class
    if (labelPosition) {
        addAllClasses.push(`label_${labelPosition}`);
    }

    // className prop checking
    if (className) {
        addAllClasses.push(className);
    }

    // label control
    const LabelField = labelText && (
        <span className="field-label">{labelText}</span>
    );

    const position = labelPosition || "right";

    return (
        <Div
            className={addAllClasses.join(" ")}
            {...props}
            style={_containerStyle}
        >
            <label htmlFor={htmlFor}>
                {position === "left" || position === "right" ? LabelField : ""}
                <input
                    {...props}
                    ref={ref}
                    type="checkbox"
                    className="checkbox"
                    id={id}
                    value={state ? 1 : 0}
                    checked={state}
                    onChange={handleOnChange}
                    disabled={disabled}
                />
                {!!value ? (
                    <Icon
                        name="checkbox-selected"
                        size={Style.f_size_25.fontSize}
                        color={Style.f_color_dark.color}
                    />
                ) : (
                    <Icon
                        name="checkbox"
                        size={Style.f_size_25.fontSize}
                        color={Style.f_color_dark.color}
                    />
                )}
            </label>
        </Div>
    );
};

export default CheckBox;

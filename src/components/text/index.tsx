import React, { CSSProperties } from "react";
import _ from "lodash";

import Style from "style";

const TextView = (props) => {
    let style: CSSProperties = {
        ...Style.f_size_default,
        ...Style.f_color_dark_medium,
        ...Style.f_weight_default,
        ...Style.p_0,
        ...Style.overflow_hidden,
        ...Style.f_ls_default,
        textOverflow: "ellipsis",
        whiteSpace: "normal",
    };

    if (_.has(props, "style")) {
        if (_.isArray(props.style)) {
            _.forEach(props.style, (value) => {
                style = {
                    ...style,
                    ...value,
                };
            });
        } else if (_.isPlainObject(props.style)) {
            style = {
                ...style,
                ...props.style,
            };
        }
    }

    let className = "";

    if (_.get(props, "numberOfLines") === 2) {
        className = "numberOfLines2";
    } else if (_.get(props, "numberOfLines") === 1) {
        className = "numberOfLines1";
    }

    return (
        <span
            style={style}
            className={`${className} ${_.get(props, "className", "")}`}
        >
            {props.children}
        </span>
    );
};

export default TextView;

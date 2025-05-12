import React from "react";
import _ from "lodash";

const LabelView = (props) => {
    let style = {};

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

    return (
        <label {..._.omit(props, ["style", "children"])} style={style}>
            {props.children}
        </label>
    );
};

export default LabelView;

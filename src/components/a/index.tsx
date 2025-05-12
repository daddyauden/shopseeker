import React from "react";
import _ from "lodash";

import Style from "style";

const AView = (props) => {
    let style = {
        ...Style.m_0,
        ...Style.p_0,
        ...Style.cursor_pointer,
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

    return (
        <a
            onClick={
                _.has(props, "onPress") &&
                !_.isNil(props.onPress) &&
                !_.has(props, "href")
                    ? (event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          props.onPress();
                      }
                    : () => {}
            }
            style={style}
            {..._.omit(props, ["style", "onPress", "children"])}
        >
            {props.children}
        </a>
    );
};

export default AView;

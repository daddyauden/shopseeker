import React, { FC } from "react";
import ReactLoading from "react-loading";

import Div from "components/div";

import Style from "style";

export interface LoadingProps {
    type?:
        | "blank"
        | "balls"
        | "bars"
        | "bubbles"
        | "cubes"
        | "cylon"
        | "spin"
        | "spinningBubbles"
        | "spokes";
    color?: string;
    size?: string | number;
    delay?: number;
}

const Loading: FC<LoadingProps> = (props) => {
    const {
        type = "spinningBubbles",
        color = Style.f_color_dark.color,
        size = "30px",
        delay = 0,
    } = props;

    return (
        <Div style={[Style.v_center, Style.position_relative]}>
            <ReactLoading
                type={type}
                color={color}
                width={size}
                height={size}
                delay={delay}
            />
        </Div>
    );
};

export default Loading;

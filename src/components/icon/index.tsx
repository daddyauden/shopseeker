import React, { FC } from "react";
import _ from "lodash";

import Text from "components/text";

import Style from "style";

type Props = {
    name: string;
    size?: number;
    color?: string;
    style?: { [key: string]: string | number }[];
};

const Icon: FC<Props> = ({
    name,
    size = Style.f_size_20.fontSize,
    color = Style.f_color_dark_bold.color,
    style = [],
}) => {
    return (
        <Text
            className={`iconfont mh-${name}`}
            style={[
                {
                    fontSize: size,
                    color: color,
                },
                ...style,
            ]}
        ></Text>
    );
};

export default Icon;

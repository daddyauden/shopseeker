import React, { FC } from "react";
import _ from "lodash";

import {
    IS_MOBILE,
    MENU_BUTTON_RIGHT,
    HEADER_BAR_HEIGHT,
} from "config/constant";

import Div from "components/div";
import Text from "components/text";

import Style from "style";

type Props = {
    style?: { [key: string]: string | number | undefined }[];
    [key: string]: any;
};

const HeaderBar: FC<Props> = ({
    style,
    headerLeft,
    headerTitle,
    headerRight,
}) => {
    let _style: { [key: string]: string | number | undefined }[] = [
        Style.row,
        Style.row_between,
        Style.column_center,
        Style.w_p100,
        Style.bg_transparent,
        IS_MOBILE ? Style.fixed_top_horizontal : Style.top_horizontal,
        {
            zIndex: 999,
            paddingTop: 0,
            paddingBottom: 0,
        },
    ];

    if (style && !_.isEmpty(style)) {
        _style = [..._style, ...style];
    }

    return (
        <Div style={_style}>
            <Div
                style={[
                    Style.w_30,
                    Style.row,
                    Style.column_center,
                    Style.row_start,
                    Style.f_size_13,
                    Style.f_color_2,
                    Style.f_weight_500,
                    {
                        height: HEADER_BAR_HEIGHT,
                        paddingLeft: MENU_BUTTON_RIGHT,
                    },
                ]}
            >
                {!_.isNil(headerLeft) && headerLeft}
            </Div>
            <Div
                style={[
                    Style.h_center,
                    Style.w_40,
                    {
                        height: HEADER_BAR_HEIGHT,
                    },
                ]}
            >
                {!_.isNil(headerTitle) && (
                    <Text
                        style={[
                            Style.f_size_15,
                            Style.f_color_dark_bold,
                            Style.f_weight_500,
                        ]}
                    >
                        {headerTitle}
                    </Text>
                )}
            </Div>
            <Div
                style={[
                    Style.w_30,
                    Style.row,
                    Style.column_center,
                    Style.row_end,
                    Style.f_size_13,
                    Style.f_color_2,
                    Style.f_weight_500,
                    {
                        height: HEADER_BAR_HEIGHT,
                        paddingRight: MENU_BUTTON_RIGHT,
                    },
                ]}
            >
                {!_.isNil(headerRight) && headerRight}
            </Div>
        </Div>
    );
};

HeaderBar.defaultProps = {
    style: [],
};

export default HeaderBar;

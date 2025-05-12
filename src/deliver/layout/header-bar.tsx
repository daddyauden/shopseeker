import React, { FC } from "react";
import _ from "lodash";

import { HEADER_BAR_HEIGHT } from "config/constant";

import Div from "components/div";

import Style from "style";

type Props = {
    [key: string]: any;
};

const HeaderBar: FC<Props> = (props) => {
    return (
        <Div
            style={[
                Style.row,
                Style.row_between,
                Style.column_center,
                Style.position_fixed,
                Style.z_index_4,
                Style.bg_transparent,
                {
                    top: 0,
                    height: HEADER_BAR_HEIGHT,
                },
                props.style,
            ]}
        >
            <Div
                style={[
                    Style.w_p30,
                    Style.row,
                    Style.column_center,
                    Style.row_start,
                    Style.p_l_3,
                ]}
            >
                {!_.isNil(props.headerLeft) && props.headerLeft}
            </Div>
            <Div style={[Style.w_p30, Style.h_center]}>
                {!_.isNil(props.headerTitle) && props.headerTitle}
            </Div>
            <Div
                style={[
                    Style.w_p30,
                    Style.row,
                    Style.column_center,
                    Style.row_end,
                    Style.p_r_3,
                ]}
            >
                {!_.isNil(props.headerRight) && props.headerRight}
            </Div>
        </Div>
    );
};

HeaderBar.defaultProps = {
    style: {},
};

export default HeaderBar;

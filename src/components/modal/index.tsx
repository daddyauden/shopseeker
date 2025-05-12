import React, { Component } from "react";
import _ from "lodash";

import { ModalProps } from "interfaces/modal";

import Div from "components/div";

import Style from "style";

class Modal extends Component<ModalProps> {
    shouldComponentUpdate(nextProps) {
        if (!_.isEqual(nextProps, this.props)) {
            return true;
        } else {
            return false;
        }
    }

    _renderHeader = () => {
        const { style, headerLeft, headerTitle, headerRight } = this.props;

        return (
            (!_.isNil(headerLeft) ||
                !_.isNil(headerTitle) ||
                !_.isNil(headerRight)) && (
                <Div
                    style={[
                        Style.w_p100,
                        Style.bg_color_15,
                        Style.p_h_3,
                        Style.p_v_2,
                        Style.b_b_light_medium,
                        Style.row,
                        Style.row_between,
                        Style.column_center,
                        Style.shadow_all,
                        style?.header,
                    ]}
                >
                    <Div
                        style={[
                            Style.w_30,
                            Style.row,
                            Style.column_center,
                            Style.row_start,
                        ]}
                    >
                        {!_.isNil(headerLeft) && headerLeft}
                    </Div>
                    <Div style={[Style.w_30, Style.h_center]}>
                        {!_.isNil(headerTitle) && headerTitle}
                    </Div>
                    <Div
                        style={[
                            Style.w_30,
                            Style.row,
                            Style.column_center,
                            Style.row_end,
                        ]}
                    >
                        {!_.isNil(headerRight) && headerRight}
                    </Div>
                </Div>
            )
        );
    };

    _renderContent = () => {
        const { style, renderContent } = this.props;

        return (
            <Div
                style={[
                    Style.bg_color_15,
                    Style.column,
                    Style.row_start,
                    style?.content,
                ]}
            >
                {renderContent}
            </Div>
        );
    };

    _renderFooter = () => {
        const { style, renderFooter } = this.props;

        return (
            <Div
                style={[
                    Style.bg_color_15,
                    Style.row,
                    Style.column_center,
                    Style.row_between,
                    Style.shadow,
                    Style.bottom_horizontal,
                    Style.p_h_4,
                    Style.p_v_3,
                    style?.footer,
                ]}
            >
                {renderFooter}
            </Div>
        );
    };

    render() {
        const {
            device,
            transparent,
            visible,
            style,
            renderContent,
            renderFooter,
        } = this.props;

        return (
            <Div
                style={[
                    transparent ? Style.bg_transparent_4 : Style.bg_color_15,
                    device.isMobile
                        ? Style.position_fixed
                        : Style.position_absolute,
                    visible ? Style.h_p100 : Style.h_0,
                    Style.column,
                    Style.overflow_hidden,
                    {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: device.isMobile ? 6 : 1,
                    },
                    style?.container,
                ]}
            >
                <Div
                    style={[
                        Style.w_p100,
                        Style.h_p100,
                        Style.column,
                        Style.row_end,
                        {
                            transform: visible
                                ? "translateY(0)"
                                : "translateY(100%)",
                            transition: ".5s ease-in-out",
                        },
                    ]}
                >
                    {this._renderHeader()}
                    <Div style={[Style.overflow_y_auto, { maxHeight: "100%" }]}>
                        {!_.isNil(renderContent) && this._renderContent()}
                    </Div>
                    {!_.isNil(renderFooter) && this._renderFooter()}
                </Div>
            </Div>
        );
    }
}

export default Modal;

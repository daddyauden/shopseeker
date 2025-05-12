import React, { FC } from "react";
import _ from "lodash";
import { Collapse } from "antd";
import { RightOutlined } from "@ant-design/icons";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Image from "components/image";

import DeliveryItem from "./item";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const WaitingList: FC<Props> = (props) => {
    const { merchant, deliver, deliveries, onClick } = props;

    const { Panel } = Collapse;

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={[merchant.id]}
            expandIcon={({ isActive }) => (
                <RightOutlined
                    style={{ top: "auto" }}
                    rotate={isActive ? 90 : 0}
                />
            )}
            expandIconPosition={"right"}
            className="delivery-list"
            style={{
                ...Style.bg_color_15,
            }}
        >
            <Panel
                key={merchant.id}
                showArrow={_.size(deliveries) > 1 ? true : false}
                header={
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_between,
                        ]}
                    >
                        <Div style={[Style.row, Style.column_center]}>
                            <Div
                                style={[
                                    Style.v_center,
                                    Style.overflow_hidden,
                                    {
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "20px",
                                    },
                                ]}
                            >
                                <Image src={merchant.logo} />
                            </Div>
                            <Div
                                style={[
                                    Style.column,
                                    Style.row_center,
                                    Style.m_l_2,
                                ]}
                            >
                                <Text
                                    style={[
                                        Style.f_size_13,
                                        Style.f_weight_500,
                                    ]}
                                >
                                    {merchant.name}
                                </Text>
                                <Div style={[Style.row, Style.column_center]}>
                                    <Icon
                                        name="location"
                                        size={Style.f_size_15.fontSize}
                                        color={Style.f_color_first.color}
                                    />
                                    <Text
                                        style={[
                                            Style.f_size_11,
                                            Style.f_color_dark,
                                            Style.m_l_1,
                                        ]}
                                    >
                                        {(merchant.distance / 1000).toFixed(1)}{" "}
                                        {trans(`mileage_km`)}
                                    </Text>
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                }
            >
                {_.map(deliveries, (delivery: any, index: number) => (
                    <DeliveryItem
                        key={index}
                        deliver={deliver}
                        delivery={delivery}
                        onClick={onClick}
                    />
                ))}
            </Panel>
        </Collapse>
    );
};

export default WaitingList;

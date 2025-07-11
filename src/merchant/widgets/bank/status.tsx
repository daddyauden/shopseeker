import React, { FC, useState, useEffect } from "react";
import _ from "lodash";
import { ReloadOutlined } from "@ant-design/icons";

import Config from "config";

import { getBankAccountStatus } from "merchant/request";

import A from "components/a";
import Div from "components/div";
import Text from "components/text";
import Loading from "components/loading";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const BankStatusWidget: FC<Props> = ({ merchant }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [message, setMessage] = useState("");

    const requestData = async () => {
        setLoading(true);

        const res = await getBankAccountStatus({
            merchantId: merchant.id,
            paymentProvider: Config.PAYMENT_PROVIDER,
            businessType: merchant.entity,
        });

        if (_.has(res, "status") && res.status === "failed") {
            setMessage(trans("noResultFound"));
        } else {
            setData(res.data);
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        requestData();
    }, []);

    const renderView = () => {
        let views: any[] = [];

        if (message !== "") {
            return (
                <Div
                    style={[
                        Style.w_p100,
                        Style.border_round_1,
                        Style.b_warning,
                        Style.bg_color_warning,
                        Style.p_v_2,
                        Style.p_h_1,
                    ]}
                >
                    <Text style={[Style.f_size_13, Style.f_color_3]}>
                        {message}
                    </Text>
                </Div>
            );
        }

        if (!_.isEmpty(data)) {
            _.forEach(data, (value: boolean, key: string) => {
                views.push(
                    <Div
                        key={key}
                        style={[Style.row, Style.column_center, Style.p_b_2]}
                    >
                        <Text
                            style={[
                                Style.f_size_13,
                                Style.f_color_dark_bold,
                                Style.f_weight_500,
                                Style.m_r_2,
                            ]}
                        >
                            {trans(`paymentProvider_${_.toLower(key)}`)}
                        </Text>
                        {loading ? (
                            <Div style={[Style.h_center, Style.p_h_1]}>
                                <Loading
                                    type="bubbles"
                                    size={Style.f_size_25.fontSize}
                                />
                            </Div>
                        ) : (
                            <Div
                                style={[
                                    value
                                        ? Style.bg_color_blue_light
                                        : Style.bg_color_light_dark,
                                    Style.h_center,
                                    Style.border_round_1,
                                    Style.p_h_1,
                                ]}
                            >
                                <Text
                                    style={[
                                        value
                                            ? Style.f_color_blue
                                            : Style.f_color_danger,
                                        Style.f_size_11,
                                        Style.f_weight_500,
                                    ]}
                                >
                                    {trans(value ? "valid" : "invalid")}
                                </Text>
                            </Div>
                        )}
                    </Div>
                );
            });
        }

        return (
            <Div
                style={[
                    Style.column,
                    Style.row_center,
                    Style.bg_color_light,
                    Style.p_t_2,
                    Style.p_h_4,
                ]}
            >
                {views}
            </Div>
        );
    };

    return (
        <Div style={[Style.column, Style.row_center]}>
            <Div style={[Style.row, Style.column_center, Style.p_2]}>
                <Text
                    style={[Style.f_size_15, Style.f_weight_500, Style.m_r_2]}
                >
                    {trans("bankAccountStatus")}
                </Text>
                <A style={{ lineHeight: "15px" }} onPress={() => requestData()}>
                    <ReloadOutlined
                        style={{
                            ...Style.f_size_18,
                            ...Style.f_color_dark_medium,
                        }}
                        spin={loading}
                    />
                </A>
            </Div>
            {renderView()}
        </Div>
    );
};

export default BankStatusWidget;

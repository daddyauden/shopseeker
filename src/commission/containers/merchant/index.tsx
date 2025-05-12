import React, { FC, useState, useEffect } from "react";
import _ from "lodash";

import A from "components/a";
import Div from "components/div";
import Text from "components/text";
import Image from "components/image";
import Loading from "components/loading";

import { trans } from "locales";

import Style from "style";

import { useCommission } from "commission/contexts/app";

import { getServicedMerchants } from "commission/request";

type Props = {
    [key: string]: any;
};

const Merchants: FC<Props> = ({ commission, changeRoute }) => {
    const {
        config: { device },
    } = useCommission();

    const { xl, lg, md, sm, xs, isMobile } = device;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [message, setMessage] = useState("");

    const requestData = async () => {
        setLoading(true);

        const res = await getServicedMerchants({
            providerId: commission.id,
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
        if (loading) {
            return <Loading />;
        }

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

        let views: any[] = [];

        if (!_.isEmpty(data)) {
            let COLUMN_WIDTH = "100%";

            if (xl) {
                COLUMN_WIDTH = "20%";
            } else if (xl || lg) {
                COLUMN_WIDTH = "25%";
            } else if (md || sm) {
                COLUMN_WIDTH = "33.33%";
            } else if (xs || isMobile) {
                COLUMN_WIDTH = "50%";
            }

            _.forEach(data, (commission: any, key: string) => {
                const { merchant } = commission;

                views.push(
                    <A
                        key={key}
                        style={[
                            Style.v_center,
                            Style.p_3,
                            Style.m_b_4,
                            {
                                width: COLUMN_WIDTH,
                            },
                        ]}
                        onPress={() =>
                            changeRoute("commissions", { ...commission })
                        }
                    >
                        <Div
                            style={[
                                {
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50px",
                                },
                                Style.overflow_hidden,
                                Style.m_b_2,
                            ]}
                        >
                            <Image src={merchant.logo.url} />
                        </Div>
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_color_dark_bold,
                                Style.f_weight_500,
                            ]}
                        >
                            {merchant.name}
                        </Text>
                    </A>
                );
            });
        }

        return (
            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.wrap,
                    Style.w_p100,
                ]}
            >
                {views}
            </Div>
        );
    };

    return (
        <Div style={[Style.v_center]}>
            <Div style={[Style.h_center, Style.m_v_4]}>
                <Text style={[Style.f_size_17, Style.f_weight_500]}>
                    {trans("merchants")}
                </Text>
            </Div>
            {renderView()}
        </Div>
    );
};

export default Merchants;

import React, { useState, useEffect } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import { Steps } from "antd";
import Currency from "currency.js";

import { IMG_WIDTH, IS_MOBILE, IS_IOS, IS_MACOS } from "config/constant";

import CurrencyModel from "model/currency";

import { Delivery, CartItem } from "interfaces/cart";

import Lib from "helpers/lib";

import { useDeliver } from "deliver/contexts/app";

import { getDeliveryDetail } from "deliver/request";

import A from "components/a";
import Div from "components/div";
import Text from "components/text";
import Image from "components/image";
import Loading from "components/loading";
import NoResultFound from "components/no-result";
import ErrorMessage from "components/error-message";

import { trans } from "locales";

import Style from "style";

import AppleMap from "assets/icon/apple-map.png";
import GoogleMap from "assets/icon/google-map.png";

const DeliveryDetail = (props) => {
    const { data: _data } = props;

    const { deliver } = useDeliver();

    const [loading, setLoading] = useState(true);
    const [delivery, setDelivery] = useState<Delivery>();
    const [error, setError] = useState("");

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const { status, data } = await getDeliveryDetail({
                delivery: _data.id,
                deliver: deliver.id,
            });

            if (status === "succeeded" && !_.isEmpty(data)) {
                setDelivery(data);
            } else {
                setError(trans("failed"));
            }
        } catch (error: any) {
            setError(error.message);
        }

        setLoading(false);
    };

    if (loading) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <Loading />
            </Div>
        );
    }

    if (error) return <ErrorMessage message={error} />;

    if (_.isEmpty(delivery)) {
        return (
            <Div style={[Style.v_center]}>
                <NoResultFound />
            </Div>
        );
    }

    const { Step } = Steps;

    const {
        serial: deliverySerial,
        fee,
        tip,
        source,
        destination,
        contact,
        receivedTime,
        order: {
            serial,
            items,
            subtotal,
            totalTax,
            discount,
            currency,
            createdAt,
        },
        merchant,
    }: any = delivery;

    const timezone = _.get(merchant, "region.timezone", "America/Montreal");
    const symbol = _.get(CurrencyModel, `code.${_.toUpper(currency)}.symbol`);
    const total = Currency(subtotal)
        .add(totalTax)
        .subtract(discount || 0).value;

    let from = [source[1], source[0]];

    let to = [destination[1], destination[0]];

    const { googleApp, googleWeb, appleMap } = Lib.getDirection(from, to);

    return (
        <Div
            style={[
                Style.h_p100,
                Style.overflow_y_auto,
                Style.bg_color_15,
                Style.p_4,
                Style.p_b_8,
            ]}
        >
            {_.get(merchant, "logo.url") && (
                <Div style={[Style.v_center, Style.m_b_2]}>
                    <Div
                        style={[
                            Style.h_center,
                            Style.overflow_hidden,
                            Style.b_img,
                            {
                                width: "80px",
                                height: "80px",
                                borderRadius: "40px",
                            },
                        ]}
                    >
                        <Image
                            src={_.get(merchant, "logo.url")}
                            alt={_.get(merchant, "name", "")}
                        />
                    </Div>
                </Div>
            )}

            <Steps progressDot current={1} direction="vertical">
                <Step
                    title={
                        <Text style={[Style.f_size_13, Style.f_weight_500]}>
                            {_.get(merchant, "name", trans("deliverySource"))}
                        </Text>
                    }
                    description={
                        <Div style={[Style.column, Style.row_center]}>
                            <Text style={[Style.f_size_11]}>
                                {`${Lib.getAddress(merchant)}`}
                            </Text>
                            {_.get(merchant, "phone") && (
                                <A href={`tel: ${merchant.phone}`}>
                                    <Text
                                        style={[
                                            Style.f_size_11,
                                            Style.f_color_primary,
                                        ]}
                                    >
                                        {merchant.phone}
                                    </Text>
                                </A>
                            )}
                        </Div>
                    }
                />
                <Step
                    title={
                        <Text style={[Style.f_size_13, Style.f_weight_500]}>
                            {_.get(contact, "first_name") ||
                            _.get(contact, "last_name")
                                ? `${_.get(contact, "first_name", "")} ${_.get(
                                      contact,
                                      "last_name",
                                      ""
                                  )}`
                                : trans("deliveryDestination")}
                        </Text>
                    }
                    description={
                        <Div style={[Style.column, Style.row_center]}>
                            <Text style={[Style.f_size_11]}>
                                {`${Lib.getAddress(contact)}`}
                            </Text>
                            {_.get(contact, "phone") && (
                                <A href={`tel: ${contact.phone}`}>
                                    <Text
                                        style={[
                                            Style.f_size_11,
                                            Style.f_color_primary,
                                        ]}
                                    >
                                        {contact.phone}
                                    </Text>
                                </A>
                            )}
                        </Div>
                    }
                />
            </Steps>

            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.m_b_4,
                    Style.p_l_5,
                ]}
            >
                <Text
                    style={[Style.f_size_13, Style.f_weight_500, Style.m_r_2]}
                >
                    {trans("directions")}
                </Text>
                {IS_IOS ? (
                    <>
                        <A
                            target="_blank"
                            href={appleMap}
                            style={[Style.m_l_1]}
                        >
                            <Image
                                src={AppleMap}
                                style={{
                                    width: "25px",
                                }}
                            />
                        </A>
                        <A
                            target="_blank"
                            href={googleApp}
                            style={[Style.m_l_4]}
                        >
                            <Image
                                src={GoogleMap}
                                style={{
                                    width: "25px",
                                }}
                            />
                        </A>
                    </>
                ) : IS_MACOS ? (
                    <>
                        <A
                            target="_blank"
                            href={appleMap}
                            style={[Style.m_l_1]}
                        >
                            <Image
                                src={AppleMap}
                                style={{
                                    width: "25px",
                                }}
                            />
                        </A>
                        <A
                            target="_blank"
                            href={googleWeb}
                            style={[Style.m_l_4]}
                        >
                            <Image
                                src={GoogleMap}
                                style={{
                                    width: "25px",
                                }}
                            />
                        </A>
                    </>
                ) : IS_MOBILE ? (
                    <A target="_blank" href={googleApp}>
                        <Image
                            src={GoogleMap}
                            style={{
                                width: "25px",
                            }}
                        />
                    </A>
                ) : (
                    <A target="_blank" href={googleWeb}>
                        <Image
                            src={GoogleMap}
                            style={{
                                width: "25px",
                            }}
                        />
                    </A>
                )}
            </Div>

            <Div
                style={[
                    Style.column,
                    Style.row_center,
                    Style.m_b_3,
                    Style.p_b_3,
                    Style.b_b_light_medium_dashed,
                ]}
            >
                {serial && (
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_between,
                            Style.bg_color_light_medium,
                            Style.p_1,
                        ]}
                    >
                        <Text style={[Style.f_size_11, Style.f_weight_500]}>
                            {trans("orderSerial")}
                        </Text>
                        <Text style={[Style.f_size_11]}>
                            {`#${Lib.chunkStr(serial, 4)}`}
                        </Text>
                    </Div>
                )}

                {createdAt && (
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_between,
                            Style.m_t_1,
                        ]}
                    >
                        <Text style={[Style.f_size_11, Style.f_weight_500]}>
                            {trans("orderCreatedTime")}
                        </Text>
                        <Text style={[Style.f_size_11]}>
                            {dayjs(createdAt, timezone).format(
                                "YYYY-MM-DD HH:mm"
                            )}
                        </Text>
                    </Div>
                )}

                <Div
                    style={[
                        Style.row,
                        Style.column_center,
                        Style.row_between,
                        Style.m_t_1,
                    ]}
                >
                    <Text style={[Style.f_size_11, Style.f_weight_500]}>
                        {trans("subTotal")}
                    </Text>
                    <Text style={[Style.f_size_11]}>
                        {symbol}
                        {Currency(subtotal || 0).value}
                    </Text>
                </Div>

                <Div
                    style={[
                        Style.row,
                        Style.column_center,
                        Style.row_between,
                        Style.m_t_1,
                    ]}
                >
                    <Text style={[Style.f_size_11, Style.f_weight_500]}>
                        {trans("totalTax")}
                    </Text>
                    <Text style={[Style.f_size_11]}>
                        {symbol}
                        {Currency(totalTax || 0).value}
                    </Text>
                </Div>

                {_.toNumber(discount) > 0 && (
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_between,
                            Style.m_t_1,
                        ]}
                    >
                        <Text style={[Style.f_size_11, Style.f_weight_500]}>
                            {trans("discount")}
                        </Text>
                        <Text style={[Style.f_size_11]}>
                            {symbol}
                            {Currency(discount || 0).value}
                        </Text>
                    </Div>
                )}

                <Div
                    style={[
                        Style.row,
                        Style.column_center,
                        Style.row_between,
                        Style.m_t_1,
                    ]}
                >
                    <Text style={[Style.f_size_11, Style.f_weight_500]}>
                        {trans("total")}
                    </Text>
                    <Text style={[Style.f_size_11]}>
                        {symbol}
                        {Currency(total || 0).value}
                    </Text>
                </Div>
            </Div>

            <Div
                style={[
                    Style.column,
                    Style.row_center,
                    Style.m_b_1,
                    Style.p_b_3,
                    Style.b_b_light_medium_dashed,
                ]}
            >
                {deliverySerial && (
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_between,
                        ]}
                    >
                        <Text style={[Style.f_size_11, Style.f_weight_500]}>
                            {trans("deliverySerial")}
                        </Text>
                        <Text style={[Style.f_size_11]}>
                            {`#${Lib.chunkStr(deliverySerial, 4)}`}
                        </Text>
                    </Div>
                )}

                {receivedTime && (
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_between,
                            Style.m_t_1,
                        ]}
                    >
                        <Text style={[Style.f_size_11, Style.f_weight_500]}>
                            {trans("deliveryReceivedTime")}
                        </Text>
                        <Text style={[Style.f_size_11]}>
                            {dayjs(receivedTime, timezone).format(
                                "YYYY-MM-DD HH:mm"
                            )}
                        </Text>
                    </Div>
                )}

                {!_.isNil(fee) && (
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_between,
                            Style.m_t_1,
                        ]}
                    >
                        <Text style={[Style.f_size_11, Style.f_weight_500]}>
                            {trans("deliveryFee")}
                        </Text>
                        <Text style={[Style.f_size_11]}>
                            {symbol}
                            {Currency(fee || 0).value}
                        </Text>
                    </Div>
                )}

                {!_.isNil(tip) && (
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_between,
                            Style.m_t_1,
                        ]}
                    >
                        <Text style={[Style.f_size_11, Style.f_weight_500]}>
                            {trans("deliveryTip")}
                        </Text>
                        <Text style={[Style.f_size_11]}>
                            {symbol}
                            {Currency(tip || 0).value}
                        </Text>
                    </Div>
                )}
            </Div>

            {!_.isNil(items) && !_.isEmpty(items) && (
                <Div style={[Style.column, Style.row_center]}>
                    {_.map(items, (item: CartItem, index: number) => (
                        <Div
                            key={index}
                            style={[
                                Style.row,
                                Style.column_center,
                                Style.p_v_2,
                                Style.b_b_light_dashed,
                            ]}
                        >
                            <Div style={{ width: IMG_WIDTH }}>
                                <Image src={item.image} />
                            </Div>
                            <Div
                                style={[
                                    Style.flex,
                                    Style.column,
                                    Style.row_center,
                                    Style.column_start,
                                    Style.p_h_2,
                                ]}
                            >
                                {_.get(item, "title") && (
                                    <Text
                                        style={[
                                            Style.f_size_11,
                                            Style.f_weight_500,
                                        ]}
                                    >
                                        {_.get(item, "title")}
                                        {_.get(item, "hasTax") && (
                                            <Text
                                                style={[
                                                    Style.m_l_1,
                                                    Style.f_size_11,
                                                    Style.f_color_dark,
                                                ]}
                                            >
                                                ({trans("freeTax")})
                                            </Text>
                                        )}
                                    </Text>
                                )}
                                <Div
                                    style={[
                                        Style.row,
                                        Style.column_center,
                                        Style.m_t_1,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            Style.f_size_11,
                                            Style.f_weight_500,
                                        ]}
                                    >
                                        {`${symbol}${
                                            item.salePrice || item.price
                                        }`}
                                    </Text>
                                    <Text
                                        style={[
                                            Style.f_size_11,
                                            {
                                                marginLeft: "2px",
                                                marginRight: "2px",
                                            },
                                        ]}
                                    >{`/`}</Text>
                                    <Text
                                        style={[
                                            Style.f_size_11,
                                            Style.f_weight_500,
                                        ]}
                                    >
                                        {`${
                                            item.measure && item.measureUnit
                                                ? item.measure +
                                                  item.measureUnit
                                                : ""
                                        }`}
                                    </Text>
                                </Div>
                            </Div>
                            <Div
                                style={[
                                    Style.row,
                                    Style.column_center,
                                    Style.row_end,
                                ]}
                            >
                                {_.get(item, "quantity") && (
                                    <>
                                        <Text style={[Style.f_size_13]}>X</Text>
                                        <Text
                                            style={[
                                                Style.f_size_13,
                                                Style.f_color_first,
                                                Style.f_weight_500,
                                                Style.m_l_1,
                                            ]}
                                        >
                                            {_.get(item, "quantity", 1)}
                                        </Text>
                                    </>
                                )}
                            </Div>
                        </Div>
                    ))}
                </Div>
            )}
        </Div>
    );
};

export default DeliveryDetail;

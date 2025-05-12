import React, { FC, useState, useEffect } from "react";
import _ from "lodash";
import Currency from "currency.js";
import { connect } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import CurrencyModel from "model/currency";

import { Card } from "interfaces/profile";
import { ModalRenderProps } from "interfaces/modal";

import Config from "config";

import {
    getCartShippingType,
    getCartShipping,
    setCartPaymentMethodType,
    setCartPaymentMethod,
} from "helpers/cart";
import { sumTaxObject } from "helpers/cart";

import { createOrder } from "request/order";

import { goToApp, goToShop } from "utils/navigation";

import A from "components/a";
import Div from "components/div";
import Text from "components/text";
import Icon from "components/icon";
import Modal from "components/modal";
import Image from "components/image";
import Button from "components/button";
import PaymentCard from "components/payment-card/card";
import ContactCard from "components/contact-card/card";

import CardModal from "containers/checkout/card";

import { trans } from "locales";

import Style from "style";

import Amex from "assets/icon/amex.png";
import Mastercard from "assets/icon/mastercard.png";
import Unionpay from "assets/icon/unionpay.png";
import Visa from "assets/icon/visa.png";

const CardSection = ({ validation, onFocus, disabled }) => {
    const [error, setError] = useState<string>("");

    return (
        <>
            <Div
                style={[
                    Style.w_p100,
                    Style.row,
                    Style.column_center,
                    Style.row_start,
                    Style.m_t_1,
                    Style.p_b_1,
                ]}
            >
                <Text
                    style={[
                        Style.f_size_12,
                        Style.f_weight_400,
                        Style.f_color_danger,
                        Style.white_space_normal,
                    ]}
                >
                    {error}
                </Text>
            </Div>

            <CardElement
                options={{
                    disabled: disabled,
                    hidePostalCode: true,
                    iconStyle: "default",
                    style: {
                        base: {
                            iconColor: Style.f_color_dark_bold.color,
                            color: Style.f_color_dark_bold.color,
                            fontWeight: "500",
                            fontFamily:
                                '"Helvetica Neue", Helvetica, sans-serif',
                            fontSize: Style.f_size_16.fontSize + "",
                            fontSmoothing: "antialiased",
                            ":-webkit-autofill": {
                                color: Style.f_color_dark_bold.color,
                            },
                            "::placeholder": {
                                color: Style.f_color_dark.color,
                            },
                        },
                        invalid: {
                            iconColor: Style.f_color_danger.color,
                            color: Style.f_color_danger.color,
                        },
                    },
                }}
                onFocus={onFocus}
                onChange={(event: any) => {
                    const { empty, complete, error } = event;

                    if (!empty && complete && _.isNil(error)) {
                        validation(true);
                    } else {
                        validation(false);
                    }

                    if (_.isNil(error)) {
                        setError("");
                    } else if (!_.isEmpty(error)) {
                        if (_.has(error, "message")) {
                            setError(error.message);
                        } else {
                            setError(trans("error.unknown"));
                        }
                    }
                }}
            />
        </>
    );
};

type Props = {
    [key: string]: any;
};

const ConfirmOrder: FC<Props> = (props) => {
    const {
        device,
        region,
        profile: { user, cards, account },
        cart: {
            merchants,
            subtotalPrice,
            totalTax,
            totalDeliveryFee,
            totalDeliveryTip,
        },
        merchant,
    } = props;

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const [shippingType, setShippingType] = useState<string>("");
    const [shipping, setShipping] = useState<{}>({});
    const [paymentMethodType, setPaymentMethodType] = useState<string>("card");
    const [paymentMethod, setPaymentMethod] = useState<object>({});

    const [modelVisible, setModelVisible] = useState(false);
    const [modalRender, setModalRender] = useState<
        ModalRenderProps & { hideModal?: boolean }
    >({});
    const _setModalRender = (_modalRender: ModalRenderProps) => {
        setModalRender(_modalRender);

        if (_.get(_modalRender, "hideModal", false)) {
            setModelVisible(false);
        }
    };

    const [payment, setPayment] = useState<object>({});

    const isLoggedIn: boolean = !!_.get(user, "id");

    const currency = _.get(
        merchant,
        "region.currency",
        _.get(region, "currency", "cad")
    );

    const symbol = _.get(CurrencyModel, `code.${_.toUpper(currency)}.symbol`);

    const totalTaxValue = sumTaxObject(totalTax);

    const totalPrice =
        shippingType === "delivery"
            ? Currency(subtotalPrice)
                  .add(totalTaxValue)
                  .add(totalDeliveryFee)
                  .add(totalDeliveryTip)
                  .value.toFixed(2)
            : Currency(subtotalPrice).add(totalTaxValue).value.toFixed(2);

    useEffect(() => {
        (async () => {
            // set cart shipping type
            const _shippingType = await getCartShippingType();
            if (_shippingType) {
                setShippingType(_shippingType);
            }

            // set cart shipping
            const _shipping = await getCartShipping();
            if (_shipping) {
                setShipping(_shipping);
            }
        })();
    }, []);

    useEffect(() => {
        if (
            error !== "" ||
            shippingType === "" ||
            paymentMethodType === "" ||
            (shippingType === "delivery" && _.isEmpty(shipping)) ||
            (paymentMethodType === "card" && _.isEmpty(paymentMethod))
        ) {
            setValid(false);
        } else {
            setValid(true);
        }
    }, [error, shippingType, shipping, paymentMethodType, paymentMethod]);

    const submitOrder = async () => {
        const orders = _.map(merchants, (merchant) => {
            const items = _.map(merchant.items, (item) => {
                return _.pick(item, [
                    "id",
                    "title",
                    "quantity",
                    "salePrice",
                    "price",
                    "measure",
                    "measureUnit",
                    "hasTax",
                    "image",
                    "gallery",
                    "type",
                    "category",
                ]);
            });

            return {
                items,
                merchantId: _.get(merchant, "id", ""),
                taxes: _.get(merchant, "region.taxes", []),
                shipping: _.get(merchant, "shipping", {}),
            };
        });

        const requestData = {
            currency,
            orders,
            paymentProvider: Config.PAYMENT_PROVIDER,
            payment_method_type: paymentMethodType,
        };

        if (isLoggedIn && _.get(account, "id")) {
            _.set(requestData, "accountId", account.id);
        }

        if (_.get(paymentMethod, "id")) {
            _.set(requestData, "payment_method", _.get(paymentMethod, "id"));
        }

        const { status, data } = await createOrder(requestData);

        return {
            status,
            data,
        };
    };

    const confirmPayment = async (client_secret) => {
        let action = "confirmCardPayment";
        let data = {};
        let options = {};

        switch (paymentMethodType) {
            case "card":
            default:
                if (!isLoggedIn) {
                    _.set(data, "payment_method", {
                        card: elements!.getElement(CardElement)!,
                    });
                }
        }

        const { paymentIntent, error } = await stripe![action](
            client_secret,
            data,
            options
        );

        return {
            error,
            paymentIntent,
        };
    };

    const handleSubmit = async () => {
        if (!stripe) {
            setValid(false);
            return;
        }

        if (!isLoggedIn && !elements) {
            setValid(false);
            return;
        }

        setLoading(true);

        let error: any = {};
        let paymentIntent: any = {};

        try {
            let client_secret = _.get(payment, "client_secret", "");
            let payment_intent_id = _.get(payment, "pii", "");
            let paymentId = _.get(payment, "id", "");

            if (!client_secret || !payment_intent_id || !paymentId) {
                // create order, payment, res include paymentIntent client_secret and payment id
                const { status, data } = await submitOrder();

                if (status === "succeeded") {
                    setPayment({
                        client_secret: data.client_secret,
                        pii: data.pii,
                        id: data.id,
                    });

                    client_secret = data.client_secret;
                    payment_intent_id = data.pii;
                    paymentId = data.id;
                } else {
                    if (data) {
                        setError(data);
                    } else {
                        setError(trans("error.unknown"));
                    }

                    return;
                }
            }

            // confirm payment intent base on client_secret
            let res = await confirmPayment(client_secret);

            error = _.get(res, "error", null);

            if (!_.isNil(error)) {
                if (_.has(error, "message")) {
                    setError(error.message);
                } else {
                    setError(trans("paymentFailed"));
                }

                setValid(true);
                setLoading(false);
            } else {
                paymentIntent = res.paymentIntent;

                if (_.get(paymentIntent, "status", "") === "succeeded") {
                    if (merchant && _.get(merchant, "id")) {
                        goToShop(merchant.id, {
                            tab: "payment",
                            pay: paymentId,
                            pii: payment_intent_id,
                        });
                    } else {
                        goToApp({
                            tab: "payment",
                            pay: paymentId,
                            pii: payment_intent_id,
                        });
                    }
                } else {
                    setError(trans("paymentFailed"));
                    setValid(true);
                    setLoading(false);
                }
            }
        } catch (e: any) {
            setError(trans("paymentFailed"));
            setValid(true);
            setLoading(false);
        }
    };

    const showModal = () => {
        const modalRender = {
            headerLeft: (
                <A
                    onPress={() => {
                        setModelVisible(false);
                        _setModalRender({});
                    }}
                >
                    <Text style={[Style.f_size_13]}>{trans("cancel")}</Text>
                </A>
            ),
            renderContent: (
                <Div
                    style={[
                        Style.w_p100,
                        Style.overflow_hidden,
                        Style.p_3,
                        Style.p_b_4,
                    ]}
                >
                    <CardModal setModalRender={_setModalRender} />
                </Div>
            ),
        };

        setModelVisible(true);
        _setModalRender(modalRender);
    };

    const changePaymentMethodType = (value: string) => {
        if (!_.isEqual(value, paymentMethodType)) {
            setPaymentMethodType(value);

            setCartPaymentMethodType(value);
        }
    };

    const changePaymentMethod = (value: object) => {
        if (
            _.get(value, "last4", "") !== "" &&
            !_.isEqual(
                _.get(value, "brand", "XXX") +
                    "-" +
                    _.get(value, "last4", "XXX"),
                _.get(paymentMethod, "brand", "YYY") +
                    "-" +
                    _.get(paymentMethod, "last4", "YYY")
            )
        ) {
            setPaymentMethod(value);

            setCartPaymentMethod(value);
        }
    };

    const onChange = async (name: string, data: any) => {
        if (name === "paymentMethodType") {
            changePaymentMethodType(data);
        } else if (name === "paymentMethod") {
            changePaymentMethod(data);
        }
    };

    return (
        <Div style={[Style.column, Style.position_relative, Style.p_3]}>
            {shippingType === "delivery" &&
                !_.isNil(shipping) &&
                !_.isEmpty(shipping) && (
                    <Div
                        style={[
                            Style.column,
                            Style.overflow_hidden,
                            Style.bg_color_15,
                            Style.shadow_all,
                            Style.border_round_2,
                            Style.p_3,
                            Style.m_b_3,
                        ]}
                    >
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_weight_500,
                                Style.m_b_2,
                            ]}
                        >
                            {trans("deliveryDetail")}
                        </Text>
                        <Div
                            style={[
                                Style.row,
                                Style.row_between,
                                Style.column_center,
                            ]}
                        >
                            <ContactCard data={shipping} />
                        </Div>
                    </Div>
                )}

            <Div
                style={[
                    Style.column,
                    Style.overflow_hidden,
                    Style.bg_color_15,
                    Style.shadow_all,
                    Style.border_round_2,
                    Style.p_3,
                    Style.m_b_3,
                ]}
            >
                <Div
                    style={[
                        Style.w_p100,
                        Style.row,
                        Style.column_center,
                        Style.row_between,
                        Style.p_v_1,
                    ]}
                >
                    <Text style={[Style.f_size_14, Style.f_color_dark]}>
                        {trans("subTotal")}
                    </Text>
                    <Text style={[Style.f_size_14, Style.f_color_dark]}>
                        {`${symbol}${Currency(subtotalPrice).value.toFixed(2)}`}
                    </Text>
                </Div>
                {!_.isEmpty(totalTax) &&
                    Object.keys(totalTax).map((name: string, index: number) => (
                        <Div
                            key={index}
                            style={[
                                Style.w_p100,
                                Style.row,
                                Style.column_center,
                                Style.row_between,
                                Style.p_v_1,
                            ]}
                        >
                            <Text style={[Style.f_size_14, Style.f_color_dark]}>
                                {trans(`tax_${name}`)}
                            </Text>
                            <Text style={[Style.f_size_14, Style.f_color_dark]}>
                                {`${symbol}${Currency(
                                    totalTax[name]
                                ).value.toFixed(2)}`}
                            </Text>
                        </Div>
                    ))}
                {shippingType === "delivery" && (
                    <Div>
                        <Div
                            style={[
                                Style.w_p100,
                                Style.row,
                                Style.column_center,
                                Style.row_between,
                                Style.p_v_1,
                            ]}
                        >
                            <Text style={[Style.f_size_14, Style.f_color_dark]}>
                                {trans("deliveryFee")}
                            </Text>
                            <Text style={[Style.f_size_14, Style.f_color_dark]}>
                                {`${symbol}${Currency(
                                    totalDeliveryFee
                                ).value.toFixed(2)}`}
                            </Text>
                        </Div>
                        <Div
                            style={[
                                Style.w_p100,
                                Style.row,
                                Style.column_center,
                                Style.row_between,
                                Style.p_v_1,
                            ]}
                        >
                            <Text style={[Style.f_size_14, Style.f_color_dark]}>
                                {trans("deliveryTip")}
                            </Text>
                            <Text style={[Style.f_size_14, Style.f_color_dark]}>
                                {`${symbol}${Currency(
                                    totalDeliveryTip
                                ).value.toFixed(2)}`}
                            </Text>
                        </Div>
                    </Div>
                )}
                <Div
                    style={[
                        Style.w_p100,
                        Style.row,
                        Style.column_center,
                        Style.row_between,
                        Style.p_v_1,
                    ]}
                >
                    <Text style={[Style.f_size_14, Style.f_color_dark]}>
                        {trans("total")}
                    </Text>
                    <Text style={[Style.f_size_14, Style.f_color_dark]}>
                        {`${symbol}${totalPrice}`}
                    </Text>
                </Div>
            </Div>

            <Div
                style={[
                    Style.column,
                    Style.overflow_hidden,
                    Style.bg_color_15,
                    Style.shadow_all,
                    Style.border_round_2,
                    Style.p_3,
                ]}
            >
                <Text
                    style={[Style.f_size_15, Style.f_weight_500, Style.m_b_2]}
                >
                    {trans("choosePaymentMethod")}
                </Text>
                <Div style={[Style.column, Style.m_b_2]}>
                    <Div
                        style={[
                            Style.column,
                            Style.row_center,
                            paymentMethodType === "card" &&
                                Style.bg_color_light,
                            Style.p_2,
                        ]}
                    >
                        <Div
                            style={[
                                Style.column,
                                Style.row_center,
                                Style.column_start,
                            ]}
                            onClick={() =>
                                onChange("paymentMethodType", "card")
                            }
                        >
                            <Div
                                style={[
                                    Style.w_p100,
                                    Style.row,
                                    Style.column_center,
                                ]}
                            >
                                <Image
                                    src={Visa}
                                    width={32}
                                    height={21}
                                    layout="fixed"
                                />
                                <Div style={[Style.p_l_2]}></Div>
                                <Image
                                    src={Mastercard}
                                    width={32}
                                    height={21}
                                    layout="fixed"
                                />
                                <Div style={[Style.p_l_2]}></Div>
                                <Image
                                    src={Amex}
                                    width={32}
                                    height={21}
                                    layout="fixed"
                                />
                                <Div style={[Style.p_l_2]}></Div>
                                <Image
                                    src={Unionpay}
                                    width={32}
                                    height={21}
                                    layout="fixed"
                                />
                            </Div>
                            <Text
                                style={[
                                    Style.f_size_11,
                                    Style.f_color_dark,
                                    Style.f_weight_500,
                                    Style.m_t_1,
                                ]}
                            >
                                {trans("cardWithVisaAndMastercard")}
                            </Text>
                        </Div>
                        {paymentMethodType === "card" && (
                            <Div style={[Style.column]}>
                                {isLoggedIn &&
                                    !_.isEmpty(cards) &&
                                    _.map(
                                        cards,
                                        (card: Card, index: number) => (
                                            <A
                                                key={index}
                                                onPress={() =>
                                                    onChange(
                                                        "paymentMethod",
                                                        card
                                                    )
                                                }
                                                style={[
                                                    Style.row,
                                                    Style.column_center,
                                                    Style.row_start,
                                                    Style.m_t_2,
                                                    Style.p_2,
                                                    Style.bg_color_15,
                                                    Style.border_round_1,
                                                    Style.b_light_medium,
                                                ]}
                                            >
                                                <Div style={[Style.row]}>
                                                    {_.isEqual(
                                                        _.get(
                                                            card,
                                                            "brand",
                                                            "XXX"
                                                        ) +
                                                            "-" +
                                                            _.get(
                                                                card,
                                                                "last4",
                                                                "XXX"
                                                            ),
                                                        _.get(
                                                            paymentMethod,
                                                            "brand",
                                                            "YYY"
                                                        ) +
                                                            "-" +
                                                            _.get(
                                                                paymentMethod,
                                                                "last4",
                                                                "YYY"
                                                            )
                                                    ) ? (
                                                        <Icon
                                                            name="checkmark-circle"
                                                            size={
                                                                Style.f_size_20
                                                                    .fontSize
                                                            }
                                                            color={
                                                                Style
                                                                    .f_color_success
                                                                    .color
                                                            }
                                                        />
                                                    ) : (
                                                        <Icon
                                                            name="checkmark-circle-outline"
                                                            size={
                                                                Style.f_size_20
                                                                    .fontSize
                                                            }
                                                            color={
                                                                Style
                                                                    .f_color_dark_light
                                                                    .color
                                                            }
                                                        />
                                                    )}
                                                </Div>
                                                <Div
                                                    style={[
                                                        Style.m_l_2,
                                                        Style.column,
                                                        Style.row_center,
                                                        Style.column_start,
                                                    ]}
                                                >
                                                    <PaymentCard
                                                        {..._.assign(card, {
                                                            micro: true,
                                                        })}
                                                    />
                                                </Div>
                                            </A>
                                        )
                                    )}

                                {isLoggedIn ? (
                                    <A
                                        onPress={() => showModal()}
                                        style={[
                                            Style.row,
                                            Style.column_center,
                                            Style.row_start,
                                            Style.bg_color_15,
                                            Style.border_round_1,
                                            Style.b_light_medium,
                                            Style.m_t_2,
                                            Style.p_2,
                                        ]}
                                    >
                                        <Icon
                                            name="add-circle-outline"
                                            size={Style.f_size_20.fontSize}
                                            color={Style.f_color_dark.color}
                                        />
                                        <Text
                                            style={[
                                                Style.f_size_13,
                                                Style.m_l_2,
                                            ]}
                                        >
                                            {trans("addCreditOrDebitCard")}
                                        </Text>
                                    </A>
                                ) : (
                                    <Div
                                        style={[
                                            Style.w_p100,
                                            Style.row,
                                            Style.v_center,
                                            Style.m_t_1,
                                        ]}
                                    >
                                        <CardSection
                                            disabled={loading}
                                            onFocus={() => setError("")}
                                            validation={(isValid: boolean) =>
                                                setValid(isValid)
                                            }
                                        />
                                    </Div>
                                )}
                            </Div>
                        )}
                    </Div>
                </Div>
            </Div>

            <Div
                style={[
                    Style.w_p100,
                    Style.row,
                    Style.column_center,
                    Style.row_start,
                    Style.m_t_3,
                ]}
            >
                <Text style={[Style.f_size_13, Style.f_color_danger]}>
                    {error}
                </Text>
            </Div>

            {isLoggedIn && (
                <Button
                    size="fullwidth"
                    trans="payNow"
                    disabled={!valid || loading}
                    loading={loading}
                    onPress={handleSubmit}
                    style={[Style.m_v_2, Style.w_p100]}
                />
            )}

            {!isLoggedIn && paymentMethodType === "card" && (
                <Button
                    size="fullwidth"
                    trans="payNow"
                    disabled={!stripe || !valid || loading}
                    loading={loading}
                    onPress={handleSubmit}
                    style={[Style.m_v_2, Style.w_p100]}
                />
            )}

            <Div style={[Style.column]}>
                {isLoggedIn && (
                    <Modal
                        device={device}
                        transparent={true}
                        visible={modelVisible}
                        {...modalRender}
                    />
                )}
            </Div>
        </Div>
    );
};

const mapStateToProps = (state) => {
    return {
        locale: state.system.locale,
        profile: state.profile,
        region: state.region,
        cart: state.cart,
    };
};

export default connect(mapStateToProps)(ConfirmOrder);

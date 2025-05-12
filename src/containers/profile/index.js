import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import Lib from "helpers/lib";

import { deleteCard } from "request/card";
import { deleteContactAddress } from "request/address";

import {
    removeCard,
    removeAddress,
    setDefaultCard,
    setDefaultAddress,
} from "actions/profile";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Modal from "components/modal";
import ContactGroup from "components/contact-group";
import PaymentGroup from "components/payment-group";

import CardModal from "containers/checkout/card";
import ContactModal from "containers/checkout/contact";

import { trans } from "locales";

import Style from "style";

const ProfilePage = (props) => {
    const {
        device,
        remove_address,
        remove_card,
        profile: { account, addresses, cards },
    } = props;

    const [modelVisible, setModelVisible] = useState(false);
    const [modalRender, setModalRender] = useState({});
    const _setModalRender = (_modalRender) => {
        setModalRender(_modalRender);

        if (_.get(_modalRender, "hideModal", false)) {
            setModelVisible(false);
        }
    };

    const [defaultAddress] = useState({});
    const [defaultCard] = useState({});

    const showModal = (name, data = {}) => {
        let _modalRender = {};

        if (name === "contact") {
            _modalRender = {
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
                        <ContactModal
                            setModalRender={_setModalRender}
                            data={data}
                        />
                    </Div>
                ),
            };
        } else if (name === "payment") {
            _modalRender = {
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
        }

        setModelVisible(true);
        _setModalRender(_modalRender);
    };

    const onDelete = async (name, data) => {
        switch (name) {
            case "contact":
                const res = await deleteContactAddress({
                    accountId: account.id,
                    id: data.id,
                });

                if (res.status === "succeeded") {
                    remove_address(data);

                    Lib.showToast({
                        message: trans("succeeded"),
                        type: "success",
                    });
                } else if (_.has(res, "error.message")) {
                    Lib.showToast({
                        message: _.get(res, "error.message"),
                        type: "error",
                    });
                } else {
                    Lib.showToast({
                        message: trans("failed"),
                        type: "error",
                    });
                }
                break;

            case "payment":
                const res2 = await deleteCard({
                    accountId: account.id,
                    id: data.id,
                });

                if (res2.status === "succeeded") {
                    remove_card(data);

                    Lib.showToast({
                        message: trans("succeeded"),
                        type: "success",
                    });
                } else if (_.has(res2, "error.message")) {
                    Lib.showToast({
                        message: _.get(res2, "error.message"),
                        type: "error",
                    });
                } else {
                    Lib.showToast({
                        message: trans("failed"),
                        type: "error",
                    });
                }
                break;

            default:
                return false;
        }
    };

    return (
        <Div style={[Style.column, Style.h_p100, Style.position_relative]}>
            <Div
                style={[
                    Style.column,
                    Style.row_center,
                    Style.overflow_hidden,
                    Style.bg_color_15,
                    Style.shadow_all,
                    Style.border_round_2,
                    Style.m_t_3,
                    Style.p_3,
                ]}
            >
                <Div style={[Style.row, Style.column_center]}>
                    <Text
                        style={[
                            Style.f_size_15,
                            Style.f_weight_500,
                            Style.m_r_2,
                        ]}
                    >
                        {trans("deliveryAddress")}
                    </Text>
                    <A
                        onPress={() => showModal("contact")}
                        style={[Style.v_center]}
                    >
                        <Icon
                            name="add-circle-outline"
                            size={Style.f_size_25.fontSize}
                            color={Style.f_color_dark.color}
                        />
                    </A>
                </Div>
                <ContactGroup
                    device={device}
                    items={addresses}
                    value={defaultAddress}
                    onEdit={(item) => showModal("contact", item)}
                    onDelete={(item) => onDelete("contact", item)}
                />
            </Div>

            <Div
                style={[
                    Style.column,
                    Style.row_center,
                    Style.overflow_hidden,
                    Style.bg_color_15,
                    Style.shadow_all,
                    Style.border_round_2,
                    Style.m_t_3,
                    Style.p_3,
                ]}
            >
                <Div style={[Style.row, Style.column_center]}>
                    <Text
                        style={[
                            Style.f_size_15,
                            Style.f_weight_500,
                            Style.m_r_2,
                        ]}
                    >
                        {trans("orderPayment")}
                    </Text>
                    <A
                        onPress={() => showModal("payment")}
                        style={[Style.v_center]}
                    >
                        <Icon
                            name="add-circle-outline"
                            size={Style.f_size_25.fontSize}
                            color={Style.f_color_dark.color}
                        />
                    </A>
                </Div>
                <PaymentGroup
                    device={device}
                    items={cards}
                    value={defaultCard}
                    onDelete={(item) => onDelete("payment", item)}
                />
            </Div>

            <Div style={[Style.column]}>
                <Modal
                    device={device}
                    transparent={true}
                    visible={modelVisible}
                    {...modalRender}
                />
            </Div>
        </Div>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        remove_address: (data) => dispatch(removeAddress(data)),
        set_default_address: (data) => dispatch(setDefaultAddress(data)),
        remove_card: (data) => dispatch(removeCard(data)),
        set_default_card: (data) => dispatch(setDefaultCard(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

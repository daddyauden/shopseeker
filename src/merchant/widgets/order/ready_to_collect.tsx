import React, { Component, FC, useCallback, createRef } from "react";
import _ from "lodash";
import Currency from "currency.js";
import moment from "moment-timezone";

import { io } from "socket.io-client";

import Config from "config";
import { HEADER_BAR_HEIGHT, IS_MOBILE } from "config/constant";

import CurrencyModel from "model/currency";

import { Order } from "interfaces/cart";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Loading from "components/loading";
import NoResultFound from "components/no-result";

import Lib from "helpers/lib";
import { getToken } from "helpers/profile";

import { trans } from "locales";

import Style from "style";

import { orderForPick } from "merchant/request";

import { useDrawer } from "merchant/contexts/drawer";

import OrderDetail from "./detail";

type Props = {
    [key: string]: any;
};

const OrderItem: FC<Props> = ({ merchant, item, callback }) => {
    const { openDrawer } = useDrawer();

    const clickHandler = useCallback(() => {
        openDrawer({
            template: <OrderDetail item={item} />,
            direction: "right",
            closeCallback: callback,
        });
    }, []);

    const { serial, createdAt, currency, subtotal, totalTax, discount, items } =
        item;

    const symbol = _.get(CurrencyModel, `code.${_.toUpper(currency)}.symbol`);

    const total = Currency(subtotal).add(totalTax).subtract(discount).value;

    const timezone = _.get(merchant, "region.timezone", "America/Montreal");

    return (
        <Div
            style={[Style.column, Style.p_3, Style.b_b_light_medium]}
            onClick={clickHandler}
        >
            <Div style={[Style.row, Style.row_between, Style.column_center]}>
                <Text
                    style={[Style.f_size_13, Style.f_weight_500]}
                >{`#${Lib.chunkStr(serial, 4)}`}</Text>
                <Text style={[Style.f_size_13]}>
                    {moment.tz(createdAt, timezone).format("YYYY-MM-DD HH:mm")}
                </Text>
            </Div>

            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.row_between,
                    Style.w_p100,
                    Style.m_t_2,
                ]}
            >
                <Text style={[Style.f_size_13, Style.f_color_dark]}>
                    {`${symbol}${total}  /  `}
                    <Text style={[Style.f_size_13, Style.f_weight_500]}>
                        {trans("collectItems", {
                            quantity: _.size(items),
                            unit: trans(_.size(items) > 1 ? "items" : "item"),
                        })}
                    </Text>
                </Text>

                <Icon
                    name="chevron-forward"
                    size={Style.f_size_15.fontSize}
                    color={Style.f_color_dark_light.color}
                />
            </Div>
        </Div>
    );
};

type State = {
    loading: boolean;
    orders: any[];
    error: string;
    location: number[];
};

class ReadyToPickOrder extends Component<Props, State> {
    state = {
        loading: true,
        orders: [],
        error: "",
        location: [],
    };

    socket: any = null;

    audioRef = createRef<HTMLAudioElement>();

    componentDidMount() {
        this.init();

        this.fetchData();
    }

    init = async () => {
        const token = await getToken();

        let options = {
            path: "/api/v3/",
            withCredentials: true,
        };

        if (token) {
            _.set(options, "query.token", token);
        }

        const socket = io(Config.HOST, options);

        socket.on("pick_order", this.pickOrder);

        socket.on("add_order", this.addOrder);

        this.socket = socket;
    };

    fetchData = async () => {
        const { merchant } = this.props;

        try {
            const { status, data } = await orderForPick({
                merchantId: merchant.id,
            });

            if (status === "succeeded" && !_.isEmpty(data)) {
                this.setState({
                    orders: data,
                    loading: false,
                });
            } else {
                this.setState({ loading: false });
            }
        } catch (error: any) {
            this.setState({ error: error.message, loading: false });
        }
    };

    addOrder = (message) => {
        const { merchant } = this.props;
        const { orders } = this.state;

        const data = JSON.parse(message);

        if (
            !_.isEmpty(data) &&
            _.has(data, "merchantId") &&
            _.get(data, "merchantId") === merchant.id
        ) {
            const { type, payload } = data;

            if (
                type === "add" &&
                _.findIndex(orders, ["id", payload.id]) === -1
            ) {
                Lib.showToast({
                    type: "info",
                    message: trans("haveNewOrder"),
                    duration: 1,
                });

                this.audioRef?.current?.play();

                this.setState({
                    orders: _.concat(orders, payload),
                });
            }
        }
    };

    pickOrder = (message) => {
        const { orders } = this.state;

        const data = JSON.parse(message);

        if (!_.isNil(data) && !_.isEmpty(data)) {
            const { type, payload } = data;

            if (
                type === "remove" &&
                _.findIndex(orders, ["id", payload.id]) > -1
            ) {
                this.setState({
                    orders: _.filter(
                        orders,
                        (order) => order.id !== payload.id
                    ),
                });
            }
        }
    };

    handleClick = (data: object) => {
        this.socket.emit("pick_order", data);
    };

    displayList = () => {
        const { merchant } = this.props;

        const { loading, error, orders } = this.state;

        if (loading) {
            return (
                <Div style={[Style.v_center, Style.p_4]}>
                    <Loading />
                </Div>
            );
        }

        if (error) {
            return (
                <Div style={[Style.p_3]}>
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_color_danger,
                            Style.f_weight_500,
                        ]}
                    >
                        {error}
                    </Text>
                </Div>
            );
        }

        if (_.isEmpty(orders)) {
            return (
                <Div style={[Style.v_center, Style.h_p100]}>
                    <NoResultFound />
                </Div>
            );
        }

        return (
            <Div
                style={[
                    Style.h_p100,
                    Style.overflow_y_auto,
                    {
                        paddingTop: HEADER_BAR_HEIGHT,
                    },
                ]}
            >
                {_.map(orders, (order: Order) => (
                    <OrderItem
                        key={order.id}
                        item={order}
                        merchant={merchant}
                        callback={this.handleClick}
                    />
                ))}
            </Div>
        );
    };

    render() {
        const { orders } = this.state;

        return (
            <Div style={[Style.column, Style.h_p100]}>
                <audio
                    ref={this.audioRef}
                    controls={false}
                    autoPlay={false}
                    style={{ ...Style.h_0 }}
                >
                    <source
                        src={`${Config.HOST}/static/image/neworder.mp3`}
                        type="audio/mpeg"
                    ></source>
                    <source
                        src={`${Config.HOST}/static/image/neworder.wav`}
                        type="audio/wav"
                    ></source>
                </audio>

                <Div
                    style={[
                        Style.row,
                        Style.row_start,
                        Style.column_center,
                        Style.w_p100,
                        Style.bg_color_15,
                        Style.shadow_bottom,
                        Style.p_h_2,
                        IS_MOBILE
                            ? Style.fixed_top_horizontal
                            : Style.top_horizontal,
                        {
                            height: HEADER_BAR_HEIGHT,
                        },
                    ]}
                >
                    <Text
                        style={[
                            Style.f_size_15,
                            Style.f_weight_500,
                            Style.m_r_2,
                        ]}
                    >
                        {trans("readyToCollect")}
                        {_.size(orders) > 0 && ` (${_.size(orders)})`}
                    </Text>
                </Div>
                {this.displayList()}
            </Div>
        );
    }
}

export default ReadyToPickOrder;

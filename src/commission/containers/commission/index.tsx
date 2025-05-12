import React, { useState, useEffect, FC } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import { Table } from "antd";
import Currency from "currency.js";

import Config from "config";
import { FETCH_LIMIT } from "config/constant";

import CurrencyModel from "model/currency";

import Lib from "helpers/lib";

import fetch from "helpers/fetch";
import { encrypt } from "helpers/encrypt";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Image from "components/image";
import Button from "components/button";
import Loading from "components/loading";
import NoResultFound from "components/no-result";
import ErrorMessage from "components/error-message";

import { trans } from "locales";

import Style from "style";

import HeaderBar from "containers/bar/header-bar";

type Props = {
    [key: string]: any;
};

const Commissions: FC<Props> = (props) => {
    const { changeRoute, commission, merchant, begin, end, percentage } = props;

    const [loading, changeLoading] = useState(true);
    const [refreshing, changeRefreshing] = useState(true);
    const [currentPage, changeCurrentPage] = useState(0);
    const [list, changeList] = useState([]);
    const [hasMore, changeHasMore] = useState(true);
    const [errors, changeErrors] = useState([]);

    const requestData = () => {
        changeRefreshing(true);

        const selectStr = `
            id
            createdAt
            currency
            amount
            api_status
            order {
                orderCurrency: currency
                serial
                subtotal
                totalTax
                discount
            }
        `;

        const from = "moreCommissions";

        const limit = FETCH_LIMIT;

        const offset = currentPage * limit;

        let where: any = {
            destinationType: "provider",
            destination: commission.id,
            merchant: merchant.id,
        };

        const whereStr = _.reduce(
            where,
            (res: any[], value: any, key: string) => {
                if (_.isString(value)) {
                    res.push(key + ':"' + value + '"');
                } else if (_.isNumber(value)) {
                    res.push(key + ":" + value);
                }

                return res;
            },
            []
        );

        const graphql = `{
            ${from}(
                start: ${offset}
                limit: ${limit}
                where: {${whereStr.join(",")}}
                sort: "createdAt:desc"
            ) {
                items {
                    ${selectStr}
                }
                hasMore
                count
                pages
            }
        }`;

        setTimeout(async () => {
            const res = await fetch(Config.REST_HOST, "POST", {
                ie: true,
                data: encrypt({
                    query: graphql,
                }),
            });

            const { data, errors } = res;

            if (!_.isNil(errors)) {
                changeErrors(errors);
                changeRefreshing(false);
            } else {
                const { items, hasMore } = _.get(data, from);

                changeHasMore(hasMore);

                if (!_.isEmpty(items)) {
                    changeCurrentPage(currentPage + 1);
                    changeList(_.concat(list, items));
                    changeRefreshing(false);
                } else {
                    changeRefreshing(false);
                }
            }

            changeLoading(false);
        }, 300);
    };

    useEffect(() => {
        requestData();
    }, []);

    const renderView = () => {
        if (loading) {
            return <Loading />;
        }

        if (!_.isEmpty(errors)) {
            return (
                <Div
                    style={[Style.column, Style.row_center, Style.column_start]}
                >
                    {_.map(errors, (error, index) => (
                        <ErrorMessage key={index} message={error.message} />
                    ))}
                </Div>
            );
        }

        if (_.isEmpty(list)) {
            return (
                <Div style={[Style.v_center, Style.h_p100]}>
                    <NoResultFound />
                </Div>
            );
        }

        let data: any[] = [];

        _.forEach(list, (commission: any) => {
            const {
                id,
                createdAt,
                currency,
                amount,
                api_status,
                order: { serial },
            } = commission;

            data.push({
                key: id,
                createdAt: dayjs(createdAt).format("MM-DD HH:mm"),
                serial: `#${Lib.chunkStr(serial, 4)}`,
                amount: `${
                    CurrencyModel.code[_.toUpper(currency)]["symbol"]
                }${amount}`,
                status:
                    api_status === "created"
                        ? trans("succeeded")
                        : trans("failed"),
            });
        });

        return (
            <Div style={[Style.w_p100]}>
                <Table
                    columns={[
                        {
                            title: trans("orderTime"),
                            dataIndex: "createdAt",
                        },
                        {
                            title: trans("orderSerial"),
                            dataIndex: "serial",
                        },
                        {
                            title: trans("commission"),
                            dataIndex: "amount",
                        },
                        {
                            title: trans("orderStatus"),
                            dataIndex: "status",
                        },
                    ]}
                    dataSource={data}
                    pagination={false}
                />
            </Div>
        );
    };

    return (
        <Div style={[Style.v_center]}>
            <HeaderBar
                headerLeft={
                    <A
                        style={[Style.h_center]}
                        onPress={() => changeRoute("merchants", {})}
                    >
                        <Icon
                            name="chevron-back"
                            size={Style.f_size_15.fontSize}
                            color={Style.f_color_dark_medium.color}
                        />
                    </A>
                }
                style={[Style.bg_color_15]}
            />
            <Div style={[Style.v_center, Style.p_3, Style.m_t_10, Style.m_b_4]}>
                <Div
                    style={[
                        {
                            width: "100px",
                            height: "100px",
                            borderRadius: "50px",
                        },
                        Style.overflow_hidden,
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
                <Div style={[Style.h_center, Style.m_t_2]}>
                    <Text>{`${trans("commissionPercentage")}: ${
                        Currency(percentage, { precision: 4 }).multiply(100)
                            .value
                    }%`}</Text>
                </Div>
                <Div style={[Style.h_center, Style.m_t_1]}>
                    <Text>{`${dayjs(begin).format("YY-MM-DD")} / ${dayjs(
                        end
                    ).format("YY-MM-DD")}`}</Text>
                </Div>
            </Div>
            {renderView()}
            <Button
                size="small"
                trans="loadMoreBtn"
                onPress={requestData}
                loading={refreshing}
                disabled={!hasMore}
                style={[Style.m_v_4]}
            />
        </Div>
    );
};

export default Commissions;

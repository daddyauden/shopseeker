import React, { useState } from "react";
import _ from "lodash";
// import Moment from "moment";

import Div from "components/div";

import { useDeliver } from "deliver/contexts/app";

import { useQueryMore } from "helpers/apollo";
import { ORDERS } from "deliver/graphql/query";

import Input from "components/input";
import Select from "components/select";
import NoResult from "components/no-result";

import { trans } from "locales";

const Orders = () => {
    const { deliver } = useDeliver();

    const [status, setStatus] = useState({
        value: "delivered",
        label: trans("delivery_status_delivered"),
    });
    const [limit, setLimit] = useState({ value: 10, label: "Last 10 orders" });
    const [search, setSearch] = useState();

    const statusSelectOptions = [
        { value: "received", label: trans("delivery_status_received") },
        { value: "on_the_way", label: trans("delivery_status_on_the_way") },
        { value: "delivered", label: trans("delivery_status_delivered") },
    ];

    const limitSelectOptions = [
        { value: 10, label: "Last 10 orders" },
        { value: 20, label: "Last 20 orders" },
        { value: 30, label: "Last 30 orders" },
        { value: 60, label: "Last 60 orders" },
    ];

    const { data, error, refetch } = useQueryMore(ORDERS, {
        status: status.value,
        limit: limit.value,
        deliver: deliver.id,
    });

    if (error) return <NoResult />;

    function handleStatus(newValue: any) {
        setStatus({
            ...newValue,
            label: trans(`delivery_status_${newValue.value}`),
        });
        refetch({
            status: newValue.value,
        });
    }

    function handleLimit(newValue: any) {
        setLimit({
            ...newValue,
            label: trans(`delivery_status_${newValue.value}`),
        });
        refetch({
            limit: newValue.value,
        });
    }

    function handleSearch(event) {
        const { value } = event.currentTarget;
        setSearch(value);
        refetch({ searchText: value });
    }

    return (
        <Div fluid={true}>
            <Div>
                <Div md={12}>
                    <Div
                        style={{
                            marginBottom: 30,
                            boxShadow: "0 0 8px rgba(0, 0 ,0, 0.1)",
                        }}
                    >
                        <Div md={3} xs={12}>
                            <Div>{trans("orderTitle")}</Div>
                        </Div>

                        <Div md={9} xs={12}>
                            <Div>
                                <Div md={3} xs={12}>
                                    <Select
                                        options={statusSelectOptions}
                                        onChange={handleStatus}
                                    />
                                </Div>

                                <Div md={3} xs={12}>
                                    <Select
                                        options={limitSelectOptions}
                                        onChange={handleLimit}
                                    />
                                </Div>

                                <Div md={6} xs={12}>
                                    <Input
                                        value={search}
                                        placeholder="Ex: Search By Order Serial Number"
                                        onChangeText={handleSearch}
                                    />
                                </Div>
                            </Div>
                        </Div>
                    </Div>

                    <Div style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
                        <table className="table table-hover small">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="Div">{trans("orderSerial")}</th>
                                    <th scope="Div">
                                        {trans("deliveryContact")}
                                    </th>
                                    <th scope="Div">
                                        {trans("deliverySource")}
                                    </th>
                                    <th scope="Div">
                                        {trans("deliveryDestination")}
                                    </th>
                                    <th scope="Div">
                                        {trans("deliveryReceivedTime")}
                                    </th>
                                    <th scope="Div">
                                        {trans("deliveryDeliveredTime")}
                                    </th>
                                    <th scope="Div">
                                        {trans("deliveryDuration")}
                                    </th>
                                    <th scope="Div">
                                        {trans("deliveryDistance")}
                                    </th>
                                    <th scope="Div">{trans("deliveryFee")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? (
                                    data.orders.length ? (
                                        data.orders
                                            .map((item) => Object.values(item))
                                            .map((Div, index) => (
                                                <tr key={index}>
                                                    <td>{Div[0]}</td>
                                                    <td>
                                                        <div>
                                                            {Div[1]["name"]}
                                                        </div>
                                                        <div>
                                                            {Div[1]["phone"]}
                                                        </div>
                                                    </td>
                                                    <td>{Div[2]}</td>
                                                    <td>{Div[3]}</td>
                                                    {/* <td>
                                                        <Moment format="Do MMM YYYY">
                                                            {Div[4]}
                                                        </Moment>
                                                    </td>
                                                    <td>
                                                        <Moment format="Do MMM YYYY">
                                                            {Div[5]}
                                                        </Moment>
                                                    </td> */}
                                                    <td>{Div[6]}</td>
                                                    <td>{Div[7]}</td>
                                                    <td>{Div[8]}</td>
                                                </tr>
                                            ))
                                    ) : (
                                        <NoResult />
                                    )
                                ) : null}
                            </tbody>
                        </table>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export default Orders;

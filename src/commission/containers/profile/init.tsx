import React, { useState } from "react";
import _ from "lodash";
import { message as Message } from "antd";

import Config from "config";

import CountryModel from "model/country";

import { searchRegion } from "request/region";
import { SEARCH_REGIONS_FOR_INIT } from "graphql/query";

import { updateCommission } from "actions/profile";

import Div from "components/div";
import Text from "components/text";
import Button from "components/button";
import Select from "components/select";

import { useCommission } from "commission/contexts/app";

import { createProvider } from "commission/request";

import { trans } from "locales";

import Style from "style";

const InitPage = () => {
    const {
        config: { user, region: defaultRegion },
        useDispatch,
    } = useCommission();

    const [country, setCountry] = useState("");

    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState({});

    const [businessType, setBusinessType] = useState("");

    const [message, setMessage] = useState("");

    const countryOptions = _.reduce(
        _.keys(CountryModel),
        (res: any[], value: string) => {
            res.push({
                value: _.toUpper(value),
                label: trans(_.toUpper(value)),
            });

            return res;
        },
        [
            {
                value: "",
                label: trans("choose"),
            },
        ]
    );

    const businessTypeOptions = _.reduce(
        {
            individual: trans("business_type_individual"),
            company: trans("business_type_company"),
        },
        (res: any[], value: string, key: string) => {
            res.push({
                value: key,
                label: value,
            });

            return res;
        },
        [
            {
                value: "",
                label: trans("choose"),
            },
        ]
    );

    const changeCountry = async (value) => {
        if (value && value !== country) {
            setCountry(value);

            const { data, errors } = await searchRegion({
                query: SEARCH_REGIONS_FOR_INIT,
                variables: {
                    where: { country: _.toLower(value) },
                    sort: "sequence:desc",
                },
            });

            if (_.isNil(errors) && !_.isEmpty(_.get(data, "regions", []))) {
                setRegions(data.regions);
                setRegion(data.regions[0]);
            }
        }
    };

    const changeRegion = (value) => {
        if (value !== _.get(region, "id")) {
            const _region = _.find(regions, ["id", value]);

            setRegion(_region);
        }
    };

    const handleSubmit = async () => {
        const uid = user.id;
        if (!uid) {
            setMessage(trans("error.unknown"));
            return;
        }

        Message.loading("", 1)
            .then(() => {
                return createProvider({
                    uid: uid,
                    paymentProvider: Config.PAYMENT_PROVIDER,
                    businessType: businessType,
                    region: _.get(region, "id", _.get(defaultRegion, "id", "")),
                });
            })
            .then((res) => {
                const { status, data } = res;

                if (status === "succeeded") {
                    useDispatch(updateCommission(data));

                    Message.success(trans("succeeded"), 1, () =>
                        setTimeout(() => window.location.reload(), 500)
                    );
                } else if (status === "failed") {
                    Message.warning(res.data || trans("failed"), 3);
                }
            });
    };

    return (
        <Div style={[Style.p_4]}>
            <Div style={[Style.h_center, Style.m_b_8]}>
                <Text
                    style={[
                        Style.f_size_17,
                        Style.f_color_dark_bold,
                        Style.f_weight_500,
                    ]}
                >
                    {trans("creatBusinessProfile")}
                </Text>
            </Div>

            <Div style={[Style.column, Style.row_center, Style.m_b_5]}>
                <Text
                    style={[Style.f_size_15, Style.f_weight_500, Style.m_b_2]}
                >
                    {trans("business_type")}
                </Text>
                <Select
                    options={businessTypeOptions}
                    onChange={({ value }) => setBusinessType(value)}
                    value={businessType || null}
                />
            </Div>

            <Div style={[Style.column, Style.row_center, Style.m_b_5]}>
                <Text
                    style={[Style.f_size_15, Style.f_weight_500, Style.m_b_2]}
                >
                    {trans("business_region")}
                </Text>
                <Select
                    options={countryOptions}
                    onChange={({ value }) => changeCountry(value)}
                    value={country || null}
                />
                <Div style={{ height: "5px" }}></Div>
                {!_.isEmpty(regions) && (
                    <Select
                        options={_.reduce(
                            regions,
                            (res: any[], region: any) => {
                                res.push({
                                    value: region.id,
                                    label: region.title,
                                });

                                return res;
                            },
                            [
                                {
                                    value: "",
                                    label: trans("choose"),
                                },
                            ]
                        )}
                        onChange={({ value }) => changeRegion(value)}
                        value={
                            !_.isEmpty(region)
                                ? _.get(region, "id", null)
                                : _.get(regions, "0.id", null)
                        }
                    />
                )}
            </Div>

            {message !== "" && (
                <Div style={[Style.m_v_2]}>
                    <Text style={[Style.f_size_15, Style.f_color_danger]}>
                        {message}
                    </Text>
                </Div>
            )}

            <Button
                size="fullwidth"
                trans="submit"
                disabled={
                    country === "" || businessType === "" || _.isEmpty(region)
                }
                onPress={handleSubmit}
            />
        </Div>
    );
};

export default InitPage;

import React, { FC } from "react";
import _ from "lodash";

import { Router } from "interfaces/router";

import { useQuery } from "helpers/apollo";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Loading from "components/loading";
import NoResultFound from "components/no-result";
import LanguageSwitcher from "components/language-switcher";

import HeaderBar from "containers/bar/header-bar";

import ShopHeader from "containers/shop/header";
import MerchantProducts from "containers/shop/products";

import { trans } from "locales";

import Style from "style";

import { SHOP_PRODUCTS } from "graphql/query";

type Props = {
    router: Router;
    changeRouter: (router: Router) => void;
    [key: string]: any;
};

const ShopHomePage: FC<Props> = (props) => {
    const { device, shop, changeRouter } = props;

    const condition = {
        merchant: shop.id,
    };

    const { data, error, loading } = useQuery(SHOP_PRODUCTS, condition);

    if (loading) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <Loading />
            </Div>
        );
    }

    if (error) {
        return (
            <Div style={[Style.v_center, Style.h_p100, Style.p_h_4]}>
                <Text>{trans("error.unknown")}</Text>
            </Div>
        );
    }

    if (!_.has(data, "products") || _.isEmpty(data.products)) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <NoResultFound />
            </Div>
        );
    }

    const searchCategory = (category) =>
        changeRouter({
            route: "search",
            params: {
                where: {
                    category: category.id,
                    merchant: shop.id,
                    status: "online",
                },
            },
            header: {
                headerLeft: (
                    <A
                        style={[Style.h_center]}
                        onPress={() =>
                            changeRouter({
                                route: "home",
                            })
                        }
                    >
                        <Icon
                            name="chevron-back"
                            size={Style.f_size_15.fontSize}
                            color={Style.f_color_dark_medium.color}
                        />
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_color_dark_medium,
                                Style.f_weight_500,
                                Style.m_l_1,
                            ]}
                        >
                            {trans("back")}
                        </Text>
                    </A>
                ),
                headerTitle: category.title,
            },
        });

    const searchKeyword = (keyword: string) =>
        changeRouter({
            route: "search",
            params: {
                where: {
                    title_contains: keyword,
                    merchant: shop.id,
                    status: "online",
                },
            },
            header: {
                headerLeft: (
                    <A
                        style={[Style.h_center]}
                        onPress={() =>
                            changeRouter({
                                route: "home",
                            })
                        }
                    >
                        <Icon
                            name="chevron-back"
                            size={Style.f_size_15.fontSize}
                            color={Style.f_color_dark.color}
                        />
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_color_dark_medium,
                                Style.f_weight_500,
                                Style.m_l_1,
                            ]}
                        >
                            {trans("back")}
                        </Text>
                    </A>
                ),
                headerTitle: trans("search"),
            },
        });

    return (
        <Div style={[Style.overflow_hidden]}>
            <HeaderBar headerRight={<LanguageSwitcher />} />

            <ShopHeader shop={shop} onSearch={searchKeyword} />

            <MerchantProducts
                device={device}
                data={data}
                onSearch={searchCategory}
            />
        </Div>
    );
};

export default ShopHomePage;

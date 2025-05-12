import React, { FC } from "react";
import _ from "lodash";

import { useSearch } from "contexts/search";

import { ADS_HEIGHT } from "config/constant";

import Div from "components/div";
import Text from "components/text";
import Image from "components/image";
import Swiper from "components/swiper";
import SearchBar from "components/searchbar";

import Style from "style";

import Banner from "assets/image/grocery.jpg";

type Props = {
    [key: string]: any;
};

const ShopHeader: FC<Props> = ({ shop, onSearch, headerSticky }) => {
    const { keyword, updateSearch } = useSearch();

    let banner = Banner;

    if (_.get(shop, "banner.url")) {
        banner = _.get(shop, "banner");
    }

    const handleSearchButton = (keyword: string) => {
        updateSearch({
            type: "product",
            keyword,
        });

        onSearch(keyword);
    };

    return (
        <Div
            style={
                headerSticky
                    ? [
                          Style.v_center,
                          Style.bg_color_15,
                          Style.p_4,
                          Style.shadow_all,
                          Style.top_horizontal,
                          {
                              position: "fixed",
                              zIndex: 999,
                              transition: "all .2s ease-in",
                          },
                      ]
                    : [
                          Style.v_center,
                          Style.p_4,
                          {
                              transition: "all .2s ease-out",
                          },
                      ]
            }
        >
            <Div style={[Style.v_center, Style.w_p100, Style.m_b_4]}>
                <Text
                    style={[
                        Style.m_t_1,
                        Style.text_center,
                        Style.f_color_dark_bold,
                        Style.f_size_16,
                        Style.f_weight_600,
                    ]}
                >
                    {_.get(shop, "name", "")}
                </Text>
                {_.get(shop, "intro") && (
                    <Text
                        style={[
                            Style.m_t_1,
                            Style.text_center,
                            Style.f_color_dark,
                            Style.f_size_13,
                        ]}
                    >
                        {_.get(shop, "intro", "")}
                    </Text>
                )}
            </Div>

            {(banner || !_.isEmpty(_.get(shop, "ads", []))) && (
                <Div
                    style={[
                        Style.w_p100,
                        Style.border_round_2,
                        Style.overflow_hidden,
                        headerSticky
                            ? {
                                  height: 0,
                              }
                            : {
                                  height: ADS_HEIGHT,
                                  marginBottom: "20px",
                              },
                    ]}
                >
                    {!_.isEmpty(_.get(shop, "ads", [])) ? (
                        <Swiper
                            autoplay={true}
                            data={_.get(shop, "ads")}
                            component={(data) => (
                                <Div style={[Style.w_p100, Style.h_p100]}>
                                    <Image src={data} layout="responsive" />
                                </Div>
                            )}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation={false}
                            pagination={false}
                        />
                    ) : (
                        <Image
                            src={banner}
                            width={600}
                            height={200}
                            layout="responsive"
                        />
                    )}
                </Div>
            )}

            <SearchBar
                handleSearch={handleSearchButton}
                value={keyword}
                placeholder={shop.name}
                onClick={handleSearchButton}
            />
        </Div>
    );
};

export default ShopHeader;

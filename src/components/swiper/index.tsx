import React, { FC } from "react";
import _ from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, SwiperOptions } from "swiper";

import Div from "components/div";
import Icon from "components/icon";

import Style from "style";

SwiperCore.use([Navigation, Pagination]);

type Props = {
    data: any[];
    component: any;
};

const SwiperView: FC<Props & SwiperOptions> = (props) => {
    const { data, component, ...rest } = props;

    return (
        <Div style={[Style.w_p100, Style.h_p100]}>
            <Swiper {...rest}>
                {_.map(data, (slide: any, index: number) => (
                    <SwiperSlide key={index}>{component(slide)}</SwiperSlide>
                ))}
            </Swiper>
            {props.navigation &&
                _.size(data) > _.toInteger(props.slidesPerView) && (
                    <>
                        <Div className="swiper-button-prev">
                            <Icon
                                name="chevron-back"
                                size={Style.f_size_50.fontSize}
                                color={Style.f_color_primary.color}
                            />
                        </Div>
                        <Div className="swiper-button-next">
                            <Icon
                                name="chevron-forward"
                                size={Style.f_size_50.fontSize}
                                color={Style.f_color_primary.color}
                            />
                        </Div>
                    </>
                )}
            {props.pagination &&
                _.size(data) > _.toInteger(props.slidesPerView) && (
                    <Div className=".swiper-pagination"></Div>
                )}
        </Div>
    );
};

export default SwiperView;

import React from "react";

import { MERCHANT_SIGNIN_PAGE, DELIVER_SIGNIN_PAGE } from "config/route";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import Bg2 from "assets/image/bg2.jpg";
import Bg3 from "assets/image/bg3.jpg";
import Banner from "assets/image/banner.jpg";

import { trans } from "locales";

import Style from "style";

const Marketing = ({ device }) => {
    const { isDesktop, xl, lg, md } = device;

    return (
        <Div
            style={[
                Style.w_100,
                Style.h_100,
                {
                    backgroundColor: "#fafafa",
                },
            ]}
        >
            <Div
                style={[
                    Style.v_center,
                    {
                        height: "600px",
                        backgroundImage: `url(${Bg2})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    },
                ]}
            >
                <Div
                    style={[
                        Style.w_p60,
                        Style.v_center,
                        Style.bg_color_15,
                        {
                            maxWidth: "1080px",
                            boxShadow: "0px 0px 50px rgba(0,0,0,0.15)",
                            padding: "30px 0px",
                        },
                    ]}
                >
                    <Text
                        style={[
                            Style.f_size_20,
                            Style.f_color_dark_bold,
                            Style.f_weight_500,
                        ]}
                    >
                        {`家门口的生鲜超市`}
                    </Text>
                    <Text style={[Style.f_size_13, Style.m_t_4, Style.w_p80]}>
                        {`ShopSeeker依托当地生鲜超市，为用户提供蔬菜水果、肉禽蛋、百货零食、速食冻品、粮油调味等优质商品及服务。`}
                    </Text>
                </Div>
            </Div>

            <Div
                style={[
                    Style.v_center,
                    Style.position_relative,
                    {
                        borderTop: "10px solid #88B21C",
                        borderBottom: "10px solid #88B21C",
                        backgroundColor: "#FCFCFC",
                    },
                ]}
            >
                <Div
                    style={[
                        Style.h_center,
                        Style.wrap,
                        Style.w_p100,
                        Style.position_absolute,
                        {
                            top: "-60px",
                        },
                    ]}
                >
                    <A href={MERCHANT_SIGNIN_PAGE} target="_blank">
                        <Div
                            style={[
                                Style.h_center,
                                Style.bg_color_15,
                                {
                                    width: "240px",
                                    height: "120px",
                                },
                            ]}
                        >
                            <Icon
                                name="store-outline"
                                color={Style.f_color_primary.color}
                                size={Style.f_size_35.fontSize}
                            />
                            <Div style={[Style.column, Style.m_l_3]}>
                                <Text
                                    style={[
                                        Style.f_size_15,
                                        Style.f_color_primary,
                                        Style.f_weight_500,
                                    ]}
                                >{`商家入驻`}</Text>
                                <Text
                                    style={[
                                        Style.f_size_12,
                                        Style.f_color_primary,
                                        Style.f_weight_400,
                                    ]}
                                >{`每笔交易及时到账`}</Text>
                            </Div>
                        </Div>
                    </A>

                    <A href={DELIVER_SIGNIN_PAGE} target="_blank">
                        <Div
                            style={[
                                Style.h_center,
                                {
                                    backgroundColor: "#FE5513",
                                    width: "240px",
                                    height: "120px",
                                },
                            ]}
                        >
                            <Icon
                                name="delivery-car"
                                color={Style.f_color_15.color}
                                size={Style.f_size_45.fontSize}
                            />
                            <Div style={[Style.column, Style.m_l_3]}>
                                <Text
                                    style={[
                                        Style.f_size_15,
                                        Style.f_color_15,
                                        Style.f_weight_500,
                                    ]}
                                >{`注册骑手`}</Text>
                                <Text
                                    style={[
                                        Style.f_size_12,
                                        Style.f_color_15,
                                        Style.f_weight_400,
                                    ]}
                                >{`注册要求低`}</Text>
                            </Div>
                        </Div>
                    </A>
                </Div>

                <Div
                    style={[
                        Style.w_p80,
                        Style.v_center,
                        {
                            maxWidth: "1080px",
                            padding: "0 0 100px",
                        },
                    ]}
                >
                    <Div style={[Style.h_center, { margin: "100px 0 50px" }]}>
                        <Text
                            style={[
                                Style.f_size_30,
                                { color: "#6d4338" },
                                Style.f_weight_600,
                            ]}
                        >{`ShopSeeker介绍`}</Text>
                    </Div>
                    <Div
                        style={[
                            Style.column,
                            Style.w_p100,
                            isDesktop &&
                                (xl || lg || md) && { paddingRight: "40%" },
                            {
                                backgroundImage: `url(${Banner})`,
                                backgroundPosition: "right center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                            },
                        ]}
                    >
                        <Div style={[Style.row]}>
                            <Icon
                                name="arrive"
                                size={Style.f_size_30.fontSize}
                                color={"#6d4338"}
                            />
                            <Div
                                style={[Style.column, Style.m_l_3, Style.flex]}
                            >
                                <Text
                                    style={[
                                        Style.f_size_17,
                                        Style.f_weight_500,
                                        { color: "#6d4338" },
                                    ]}
                                >
                                    随时下单，最快1小时送货
                                </Text>
                                <Text
                                    style={[
                                        Style.f_size_13,
                                        Style.m_t_1,
                                        { color: "#6d4338" },
                                    ]}
                                >
                                    用户可在任何时候通过“ShopSeeker微信小程序 或
                                    手机App”下单，送货员最快可在1小时候之内送货上门。
                                </Text>
                            </Div>
                        </Div>
                        <Div
                            style={[
                                Style.row,
                                {
                                    margin: "50px 0",
                                },
                            ]}
                        >
                            <Icon
                                name="quanlity"
                                size={Style.f_size_30.fontSize}
                                color={"#6d4338"}
                            />
                            <Div
                                style={[Style.column, Style.m_l_3, Style.flex]}
                            >
                                <Text
                                    style={[
                                        Style.f_size_17,
                                        Style.f_weight_500,
                                        { color: "#6d4338" },
                                    ]}
                                >
                                    时刻把控，新鲜实惠
                                </Text>
                                <Text
                                    style={[
                                        Style.f_size_13,
                                        Style.m_t_1,
                                        { color: "#6d4338" },
                                    ]}
                                >
                                    我们为用户挑选新鲜实惠的商品，时刻把控菜品和服务的品质
                                </Text>
                            </Div>
                        </Div>
                        <Div style={[Style.row]}>
                            <Icon
                                name="sync"
                                size={Style.f_size_30.fontSize}
                                color={"#6d4338"}
                            />
                            <Div
                                style={[Style.column, Style.m_l_3, Style.flex]}
                            >
                                <Text
                                    style={[
                                        Style.f_size_17,
                                        Style.f_weight_500,
                                        { color: "#6d4338" },
                                    ]}
                                >
                                    价格同步，折扣更多
                                </Text>
                                <Text
                                    style={[
                                        Style.f_size_13,
                                        Style.m_t_1,
                                        { color: "#6d4338" },
                                    ]}
                                >
                                    线上的价格与实体店保持一致，定时推出折扣活动，给用户实实在在的实惠。
                                </Text>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </Div>

            <Div
                style={[
                    Style.v_center,
                    {
                        backgroundImage: `url(${Bg3})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    },
                ]}
            >
                <Div
                    style={[
                        Style.w_p80,
                        Style.row,
                        Style.row_between,
                        {
                            maxWidth: "1080px",
                            padding: "30px 0 130px",
                        },
                    ]}
                >
                    <Div style={[Style.column, Style.row_center]}>
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_weight_500,
                                Style.f_color_dark_bold,
                            ]}
                        >
                            {trans("supportTitle")}
                        </Text>
                        <Text
                            style={[
                                Style.f_size_12,
                                Style.f_color_dark_bold,
                                Style.m_t_2,
                            ]}
                        >
                            {trans("input_email")}: support@shopseeker.com
                        </Text>
                    </Div>
                </Div>
                {device.isDesktop && window.location.origin.includes(".cn") && (
                    <Div style={[Style.v_center, Style.p_1]}>
                        <Text style={[Style.f_size_11, Style.f_color_dark]}>
                            © 2020 无锡好物仓科技有限公司
                        </Text>
                        <Div style={[Style.h_center, Style.m_v_1]}>
                            <A
                                style={[Style.m_r_2]}
                                href="https://beian.miit.gov.cn"
                                target="_blank"
                            >
                                <Text
                                    style={[
                                        Style.f_size_11,
                                        Style.f_color_dark,
                                    ]}
                                >
                                    苏ICP备20041433号-1
                                </Text>
                            </A>
                            <A style={[Style.m_r_2]} href="#">
                                <Text
                                    style={[
                                        Style.f_size_11,
                                        Style.f_color_dark,
                                    ]}
                                >
                                    Tel: 08618180981229
                                </Text>
                            </A>
                            <A
                                href="mailto:support@shopseeker.cn"
                                target="_blank"
                            >
                                <Text
                                    style={[
                                        Style.f_size_11,
                                        Style.f_color_dark,
                                    ]}
                                >
                                    Email: support@shopseeker.cn
                                </Text>
                            </A>
                        </Div>
                    </Div>
                )}
            </Div>
        </Div>
    );
};

export default Marketing;

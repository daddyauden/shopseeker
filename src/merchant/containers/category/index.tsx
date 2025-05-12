import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Table, Popconfirm } from "antd";

import { FOOTER_BAR_HEIGHT } from "config/constant";

import { useWindowSize } from "utils/use-window-size";

import Lib from "helpers/lib";
import { useQuery, useMutation } from "helpers/apollo";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import { trans } from "locales";

import Style from "style";

import { CATEGORIES } from "merchant/graphql/query";
import { DELETE_CATEGORY } from "merchant/graphql/mutation";

import { useMerchant } from "merchant/contexts/app";
import { useDrawer } from "merchant/contexts/drawer";

const CategoryPage = () => {
    const [visible, setVisible] = useState(false);
    const [activeItem, setActiveItem] = useState("");

    const { merchant, updateMerchant } = useMerchant();

    const { openDrawer } = useDrawer();

    const where: { [key: string]: any } = {
        merchant: merchant.id,
    };

    const condition = {
        sort: "sequence:desc",
        where,
    };

    const { data, error, loading, refetch } = useQuery(CATEGORIES, condition);

    const [deleteCategory, { loading: deleteLoading }] =
        useMutation(DELETE_CATEGORY);

    const { height } = useWindowSize();

    useEffect(() => {
        if (
            data &&
            _.has(data, "categories") &&
            !_.isEqual(merchant.categories, data.categories)
        ) {
            updateMerchant({ id: merchant.id, categories: data.categories });
        }
    }, [data]);

    const postCategory = (data = null) => {
        openDrawer({
            template: "category_post",
            direction: "bottom",
            data,
            closeCallback: refetch,
        });
    };

    const columns = [
        {
            title: () => (
                <Div style={[Style.v_center]}>
                    <Text style={[Style.f_size_13, Style.f_weight_500]}>
                        {trans("input_sequence")}
                    </Text>
                </Div>
            ),
            dataIndex: "sequence",
            sorter: {
                compare: (a, b) => a.sequence - b.sequence,
                multiple: 2,
            },
            showSorterTooltip: false,
            render: (data) => (
                <Div style={[Style.v_center]}>
                    <Text style={[Style.f_size_13, Style.f_weight_500]}>
                        {data}
                    </Text>
                </Div>
            ),
        },
        {
            title: (
                <Text style={[Style.f_size_13, Style.f_weight_500]}>
                    {trans("input_title")}
                </Text>
            ),
            dataIndex: "title",
        },
        {
            title: "",
            key: "operation",
            render: (data) => {
                return (
                    <Div style={[Style.h_center]}>
                        <A onPress={() => postCategory(data)}>
                            <Icon
                                name="edit"
                                size={Style.f_size_20.fontSize}
                                color={Style.f_color_dark.color}
                            />
                        </A>
                        <Popconfirm
                            title={trans("areYouSure")}
                            visible={visible && activeItem === data.id}
                            okText={trans("yes")}
                            cancelText={trans("cancel")}
                            okButtonProps={{ loading: deleteLoading }}
                            onConfirm={async () => {
                                const res = await deleteCategory({
                                    variables: { id: data.id },
                                });
                                setVisible(false);
                                if (
                                    _.has(res, "data") &&
                                    !_.isEmpty(res.data)
                                ) {
                                    refetch();
                                    Lib.showToast({
                                        message: trans("succeeded"),
                                        type: "success",
                                        duration: 1,
                                    });
                                } else {
                                    Lib.showToast({
                                        message: trans("failed"),
                                        type: "error",
                                    });
                                }
                            }}
                            onCancel={() => setVisible(false)}
                        >
                            <a
                                onClick={() => {
                                    setActiveItem(data.id);
                                    setVisible(true);
                                }}
                                style={{ ...Style.m_l_4 }}
                            >
                                <Icon
                                    name="trash-outline"
                                    size={Style.f_size_20.fontSize}
                                    color={Style.f_color_dark.color}
                                />
                            </a>
                        </Popconfirm>
                    </Div>
                );
            },
        },
    ];

    return (
        <Div style={[Style.column, Style.row_center, Style.h_p100]}>
            {error ? (
                <Div style={[Style.p_3]}>
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_color_danger,
                            Style.f_weight_500,
                        ]}
                    >
                        {error.message}
                    </Text>
                </Div>
            ) : (
                <Div style={[Style.h_p100, Style.overflow_y_auto]}>
                    <Table
                        size="middle"
                        loading={loading}
                        columns={columns}
                        dataSource={
                            data && !_.isEmpty(_.get(data, "categories"))
                                ? _.map(
                                      _.get(data, "categories"),
                                      (category, index) => {
                                          return {
                                              key: `${index}`,
                                              id: category.id,
                                              sequence: category.sequence,
                                              title: category.title,
                                          };
                                      }
                                  )
                                : null
                        }
                        pagination={false}
                        scroll={{
                            scrollToFirstRowOnChange: false,
                            y: height - FOOTER_BAR_HEIGHT - 48,
                        }}
                    />
                </Div>
            )}

            <A
                onPress={postCategory}
                style={[
                    Style.v_center,
                    Style.bg_color_15,
                    Style.shadow_all,
                    Style.position_fixed,
                    Style.z_index_5,
                    {
                        right: 20,
                        bottom: FOOTER_BAR_HEIGHT + 20,
                        width: "50px",
                        height: "50px",
                        borderRadius: "25px",
                    },
                ]}
            >
                <Icon
                    name="add"
                    size={Style.f_size_30.fontSize}
                    color={Style.f_color_primary.color}
                />
            </A>
        </Div>
    );
};

export default CategoryPage;

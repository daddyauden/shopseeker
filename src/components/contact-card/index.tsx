import React, { FC } from "react";
import _ from "lodash";

import { Contact } from "interfaces/profile";

import A from "components/a";
import Icon from "components/icon";
import Div from "components/div";

import Style from "style";

import RealContact from "./card";

type Props = {
    item: Contact;
    value?: Contact;
    onChange?: (item: Contact) => void;
    onEdit?: Function;
    onDelete?: Function;
    hasEdit?: boolean;
    hasDelete?: boolean;
};

const ContactCard: FC<Props> = (props) => {
    const { item, value, onChange, onDelete, onEdit, hasDelete, hasEdit } =
        props;

    const checked =
        !_.isNil(value) &&
        _.has(value, "id") &&
        _.isEqual(_.get(item, "id"), _.get(value, "id"));

    return (
        <Div
            style={[
                Style.position_relative,
                Style.w_p100,
                Style.bg_color_light,
                Style.p_h_3,
                Style.p_t_3,
                Style.p_b_4,
                Style.cursor_pointer,
            ]}
            onClick={!_.isNil(onChange) ? () => onChange!(item) : undefined}
        >
            {checked && (
                <Div
                    style={[
                        Style.column_center,
                        Style.top_horizontal,
                        {
                            left: "50%",
                            marginLeft: "-15px",
                        },
                    ]}
                >
                    <Icon
                        name="checkmark-circle"
                        size={Style.f_size_20.fontSize}
                        color={Style.f_color_success.color}
                    />
                </Div>
            )}

            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.row_between,
                    Style.top_right,
                    {
                        top: "20px",
                        right: "25px",
                    },
                ]}
            >
                {hasEdit === true && !_.isNil(onEdit) && (
                    <A onPress={onEdit} style={[Style.m_r_2]}>
                        <Icon
                            name="edit"
                            size={Style.f_size_20.fontSize}
                            color={Style.f_color_dark.color}
                        />
                    </A>
                )}
                {hasDelete === true && !_.isNil(onDelete) && (
                    <A onPress={onDelete}>
                        <Icon
                            name="trash-outline"
                            size={Style.f_size_20.fontSize}
                            color={Style.f_color_dark.color}
                        />
                    </A>
                )}
            </Div>

            <RealContact data={item} />
        </Div>
    );
};

export default ContactCard;

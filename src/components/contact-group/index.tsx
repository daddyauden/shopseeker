import React, { FC } from "react";
import _ from "lodash";

import { Device } from "interfaces/device";
import { Contact } from "interfaces/profile";

import Div from "components/div";
import Swiper from "components/swiper";
import ContactCard from "components/contact-card";

import Style from "style";

interface Props {
    device: Device;
    items: Contact[];
    value?: Contact;
    onChange?: Function;
    onDelete: Function;
    onEdit: Function;
}

const ContactGroup: FC<Props> = ({
    device,
    items,
    value,
    onChange,
    onDelete,
    onEdit,
}) => {
    return (
        <>
            {!_.isEmpty(items) && (
                <Div style={[Style.w_p100, Style.m_t_2]}>
                    <Swiper
                        data={items}
                        component={(item: Contact, index: number) => (
                            <ContactCard
                                key={index}
                                hasEdit={true}
                                hasDelete={true}
                                onChange={
                                    onChange ? () => onChange(item) : undefined
                                }
                                onEdit={() => onEdit(item)}
                                onDelete={() => onDelete(item)}
                                item={item}
                                value={value}
                            />
                        )}
                        slidesPerView={device.isMobile ? 1 : 1}
                        slidesPerGroup={device.isMobile ? 1 : 1}
                        spaceBetween={0}
                        centeredSlides={true}
                        pagination={true}
                    />
                </Div>
            )}
        </>
    );
};

export default ContactGroup;

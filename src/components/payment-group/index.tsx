import React, { FC } from "react";

import { Card } from "interfaces/profile";
import { Device } from "interfaces/device";

import Div from "components/div";
import Swiper from "components/swiper";
import PaymentCard from "components/payment-card";

import Style from "style";

interface Props {
    device: Device;
    items: Card[];
    value?: Card;
    onChange?: Function;
    onDelete: Function;
}

const PaymentGroup: FC<Props> = ({
    device,
    items,
    value,
    onChange,
    onDelete,
}) => {
    return items.length > 0 ? (
        <Div style={[Style.w_p100, Style.m_t_2]}>
            <Swiper
                data={items}
                component={(item: Card, index: number) => (
                    <PaymentCard
                        key={index}
                        onChange={onChange ? () => onChange(item) : undefined}
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
    ) : null;
};

export default PaymentGroup;

import React from "react";
import _ from "lodash";

import { useDrawer } from "contexts/drawer";

import Drawer from "components/drawer";

import OrderDetail from "containers/order/detail";

import { useCustomer } from "customer/contexts/app";

const DrawerContainer = () => {
    const {
        isOpen,
        width,
        height,
        direction,
        template,
        data,
        closeCallback,
        closeDrawer,
    } = useDrawer();
    const {
        config: { device },
    } = useCustomer();

    if (_.isNil(template)) {
        return null;
    }

    let component: any = null;

    if (_.isString(template)) {
        switch (template) {
            case "order_detail":
                component = <OrderDetail item={data} />;
                break;
        }
    } else {
        component = template;
    }

    const { md, lg, xl, isMobile } = device;

    let colWidth: string = "80vw";

    if (direction === "top" || direction === "bottom") {
        colWidth = "100vw";
    } else {
        if (!isMobile) {
            if (xl) {
                colWidth = "30%";
            } else if (lg) {
                colWidth = "40%";
            } else if (md) {
                colWidth = "50%";
            }
        }
    }

    return (
        <Drawer
            open={isOpen}
            width={width || colWidth}
            height={height}
            placement={direction}
            toggleHandler={() => {
                closeDrawer();
                closeCallback && closeCallback();
            }}
        >
            {component}
        </Drawer>
    );
};

export default DrawerContainer;

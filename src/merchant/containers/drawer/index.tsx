import React from "react";
import _ from "lodash";

import Drawer from "components/drawer";

import { useMerchant } from "merchant/contexts/app";
import { useDrawer } from "merchant/contexts/drawer";

import ProductAdd from "merchant/containers/product/post";
import OrderDetail from "merchant/containers/order/detail";
import CategoryPost from "merchant/containers/category/post";
import ProductUpdate from "merchant/containers/product/post";
import ProfileDrawer from "merchant/containers/profile/drawer";

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
    } = useMerchant();

    if (_.isNil(template)) {
        return null;
    }

    let component: any = null;

    if (_.isString(template)) {
        switch (template) {
            case "profile_drawer":
                component = <ProfileDrawer />;
                break;

            case "category_post":
                component = <CategoryPost data={data} />;
                break;

            case "product_add":
                component = <ProductAdd data={data} />;
                break;

            case "product_update":
                component = <ProductUpdate data={data} />;
                break;

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

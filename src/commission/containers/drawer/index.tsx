import React from "react";
import _ from "lodash";

import Drawer from "components/drawer";

import { useCommission } from "commission/contexts/app";
import { useDrawer } from "commission/contexts/drawer";

import ProfileDrawer from "commission/containers/profile/drawer";

const DrawerContainer = () => {
    const {
        isOpen,
        width,
        height,
        direction,
        template,
        closeCallback,
        closeDrawer,
    } = useDrawer();
    const {
        config: { device },
    } = useCommission();

    if (_.isNil(template)) {
        return null;
    }

    let component: any = null;

    if (_.isString(template)) {
        switch (template) {
            case "profile_drawer":
                component = <ProfileDrawer />;
                break;
        }
    } else {
        component = template;
    }

    const { md, lg, xl, isMobile } = device;

    let colWidth: string = "80vw";

    if (!isMobile) {
        if (xl) {
            colWidth = "30%";
        } else if (lg) {
            colWidth = "40%";
        } else if (md) {
            colWidth = "50%";
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

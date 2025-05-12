import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { SearchProvider } from "contexts/search";
import { DrawerProvider } from "contexts/drawer";

import Head from "customer/layout/head";
import Drawer from "customer/containers/drawer";
import { useCustomer } from "customer/contexts/app";

const CustomerRoutes = (props) => {
    const {
        config: { query },
    } = useCustomer();

    return (
        <SearchProvider {...query}>
            <DrawerProvider>
                <Head {...props} />
                {props.children}
                <Drawer />
            </DrawerProvider>
        </SearchProvider>
    );
};

const mapStateToProps = (state) => {
    return {
        locale: state.system.locale,
    };
};

export default connect(mapStateToProps)(CustomerRoutes);

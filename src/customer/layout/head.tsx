import React from "react";
import _ from "lodash";
import NextHead from "next/head";

const defaultTitle = "ShopSeeker, delivery or pickup groceries in local store.";

const defaultDescription =
    "ShopSeeker, Shopping online. Retail, Supermarket, Fashion Store, Grocery, everything for life easy to find.";

const Head = (props) => (
    <NextHead>
        <meta
            property="og:title"
            content={_.get(props, "title", "") + " " + defaultTitle}
        />
        <meta
            property="og:description"
            content={_.get(props, "description", "") + " " + defaultDescription}
        />
        <meta
            name="description"
            content={_.get(props, "description", "") + " " + defaultDescription}
        />
        <title>{_.get(props, "title", "")}</title>
    </NextHead>
);

export default Head;

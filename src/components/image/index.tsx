import React from "react";
import _ from "lodash";
import Image from "next/image";

import Placeholder from "assets/image/product-placeholder.png";

import Config from "config";

const Img = (props) => {
    let src = _.get(props, "src");

    if (_.isPlainObject(src) && _.get(src, "url")) {
        src = _.get(src, "url");
    }

    if (_.isNil(src) || !src) {
        src = Placeholder;
    } else if (_.isPlainObject(src) && _.has(src, "src")) {
        src = src.src;
    } else if (_.startsWith(_.toLower(src), "blob")) {
        src = src;
    } else if (_.startsWith(_.toLower(src), "http")) {
        src = src;
    } else if (_.includes(src, "data:image")) {
        src = src;
    } else if (_.includes(src, "assets")) {
        src = src;
    } else {
        src = Config.MEDIA_HOST + src;
    }

    return (
        <Image
            src={src}
            width={_.get(props, "width", 200)}
            height={_.get(props, "height", 200)}
            layout={_.get(props, "layout", "fill")}
            objectFit={_.get(props, "objectFit", "cover")}
            quality={_.get(props, "quality", 100)}
        />
    );
};

export default Img;

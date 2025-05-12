import _ from "lodash";
import { v1, v4 } from "uuid";

import { message as Message } from "antd";
import parsePhoneNumber from "libphonenumber-js";

const crc32 = require("crc32");

const Lib = {
    c2c: function (data: any) {
        return crc32(data.toString(), true);
    },

    orderId: function () {
        return Math.floor(Math.random() * Date.now());
    },

    uuidv1: function () {
        return v1();
    },

    uuidv4: function () {
        return v4();
    },

    getEncodeAddress: function (data: any) {
        return Lib.getAddress(data, true);
    },

    getAddress: function (data: any, encode?: boolean) {
        let address = "";

        if (_.isString(data)) {
            address = data;
        } else if (_.isPlainObject(data)) {
            let str = "";
            if (_.get(data, "line2", "")) {
                str += data.line2 + "-";
            }

            if (_.get(data, "line1", "")) {
                str += data.line1 + ", ";
            }

            if (_.get(data, "city", "")) {
                str += data.city + ", ";
            }

            if (_.get(data, "state", "")) {
                str += data.state + ", ";
            }

            if (_.get(data, "country", "")) {
                str += data.country + " ";
            }

            if (_.get(data, "postal_code", "")) {
                str += data.postal_code;
            }

            address = str;
        } else if (_.isArray(data)) {
            address = _.join(data, ",");
        }

        return encode ? encodeURIComponent(address) : address;
    },

    getMap: (address: any) => {
        const _address = Lib.getAddress(address);

        const googleApp =
            "comgooglemaps-x-callback://?q=" +
            _address +
            "&x-success=shopseeker://&x-source=ShopSeeker";

        const googleWeb = "https://www.google.com/maps/?q=" + _address;

        const appleMap = "https://maps.apple.com/?q=" + _address;

        return {
            googleApp,
            googleWeb,
            appleMap,
        };
    },

    getDirection: (from: any, to: any) => {
        const _from = Lib.getAddress(from);
        const _to = Lib.getAddress(to);

        const googleApp = `comgooglemaps-x-callback:\/\/?saddr=${_from}&daddr=${_to}&directionsmode=driving&zoom=17&x-success=shopseeker&x-source=ShopSeeker`;

        const googleWeb = `https://www.google.com/maps/?saddr=${_from}&daddr=${_to}&directionsmode=driving&zoom=17&x-success=shopseeker&x-source=ShopSeeker`;

        const appleMap = `https://maps.apple.com/?saddr=${_from}&daddr=${_to}&dirflg=d`;

        return {
            googleApp,
            googleWeb,
            appleMap,
        };
    },

    getCurrentPosition: () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        return new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        );
    },

    isValidEmail: function (email: string) {
        const reg =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return reg.test(email);
    },

    showToast: function (data) {
        const {
            type = "open",
            message = "",
            duration,
            icon = null,
            key = "toast",
            style = {},
            onClose = null,
            onClick = null,
        } = data;

        const _type = _.includes(
            ["open", "success", "error", "info", "warning", "warn", "loading"],
            type
        )
            ? type
            : "open";

        Message[_type]({
            content: message,
            duration: duration || 2,
            icon: icon,
            key: key,
            style,
            onClose: onClose,
            onClick: onClick,
        });
    },

    hideToast: function (key = "toast") {
        Message.destroy(key);
    },

    chunkStr: function (string, size) {
        return _.join(
            _.toString(string).match(new RegExp(".{1," + size + "}", "g")),
            "-"
        );
    },

    encode: function (input) {
        try {
            return encodeURIComponent(input);
        } catch (e) {
            return null;
        }
    },

    decode: function (input) {
        try {
            return decodeURIComponent(input.replace(/\+/g, " "));
        } catch (e) {
            return null;
        }
    },

    querystring: function (query) {
        query = decodeURIComponent(query);
        query =
            query.indexOf("?") > -1
                ? query.substring(query.indexOf("?"))
                : query;

        var parser = /([^=?#&]+)=?([^&]*)/g,
            result = {},
            part;

        while ((part = parser.exec(query))) {
            var key = this.decode(part[1]),
                value = this.decode(part[2]);

            if (key === null || value === null || key in result) continue;
            result[key] = value;
        }

        return result;
    },

    downloadFile: async function (url) {
        const res = await fetch(url);

        return await res.blob();
    },

    uploadFile: async function (file) {
        let resource: any = null;

        try {
            if (_.isString(file) && file.includes("http")) {
                resource = await this.downloadFile(file);
            } else if (file instanceof Blob) {
                resource = file;
            }

            if (!_.isNil(resource)) {
                let fileType = "jpg";

                const mimeType = resource["type"];

                switch (mimeType) {
                    case "image/png":
                        fileType = "png";
                        break;

                    case "image/svg+xml":
                        fileType = "svg";
                        break;

                    case "image/gif":
                        fileType = "gif";
                        break;

                    case "image/webp":
                        fileType = "webp";
                        break;

                    case "image/jpeg":
                        fileType = "jpeg";
                        break;

                    case "image/apng":
                        fileType = "apng";
                        break;
                }

                const form = new FormData();

                const fileName = this.orderId() + "." + fileType;

                form.append("files", resource, fileName);

                const res = await fetch(window.location.origin + "/upload", {
                    method: "POST",
                    body: form,
                });

                const data = await res.json;

                return data[0];
            }
        } catch (e) {
            return null;
        }
    },

    phone: function (number: string) {
        return parsePhoneNumber(number)?.formatNational();
    },

    getClientIp: function (req) {
        if (req.headers["x-forwarded-for"]) {
            // try to get from x-forwared-for if it set (behind reverse proxy)
            return req.headers["x-forwarded-for"].split(",")[0];
        } else if (req.connection && req.connection.remoteAddress) {
            // no proxy, try getting from connection.remoteAddress
            return req.connection.remoteAddress;
        } else if (req.socket) {
            // try to get it from req.socket
            return req.socket.remoteAddress;
        } else if (req.connection && req.connection.socket) {
            // try to get it form the connection.socket
            return req.connection.socket.remoteAddress;
        } else {
            // if non above, fallback.
            return req.ip;
        }
    },
};

export default Lib;

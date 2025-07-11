import _ from "lodash";

import Mcc from "model/mcc";
import Phone from "model/phone";
import State from "model/country";
import Postal from "model/postal";

const Shop = {
    CA: {
        logo: {
            type: "file",
            name: "logo",
            label_trans: "input_merchant_logo",
            format: "image/jpg,image/jpeg,image/png",
            multiple: false,
            required: true,
        },
        banner: {
            type: "file",
            name: "banner",
            label_trans: "input_merchant_banner",
            format: "image/jpg,image/jpeg,image/png",
            multiple: false,
            required: false,
        },
        ads: {
            type: "file",
            name: "ads",
            label_trans: "input_merchant_ads",
            format: "image/jpg,image/jpeg,image/png",
            multiple: true,
            required: false,
        },
        name: {
            type: "text",
            name: "name",
            label_trans: "input_merchant_name",
            required: true,
        },
        intro: {
            type: "text",
            name: "intro",
            label_trans: "input_merchant_intro",
            required: false,
        },
        description: {
            type: "textarea",
            name: "description",
            label_trans: "input_merchant_description",
            required: false,
        },
        mcc: {
            type: "choices",
            name: "mcc",
            choices: Mcc,
            label_trans: "input_merchant_mcc",
            trans: "choose",
            required: false,
            canSearch: true,
        },
        url: {
            type: "text",
            name: "url",
            label_trans: "input_merchant_url",
            placeholder: "https://www.example.com",
            note: "No website? Enter an App Store link, or a social profile.",
            required: false,
        },
        email: {
            type: "email",
            name: "email",
            label_trans: "input_merchant_email",
            required: true,
        },
        phone: {
            type: "mask",
            mask: Phone.CA.mask,
            placeholder: Phone.CA.placeholder,
            name: "phone",
            label_trans: "input_merchant_phone",
            required: true,
        },
        line1: {
            type: "text",
            name: "line1",
            label_trans: "input_merchant_address",
            trans: "address_line1",
            required: true,
        },
        line2: {
            type: "text",
            name: "line2",
            trans: "address_line2",
            required: false,
        },
        postal_code: {
            type: "mask",
            mask: Postal.CA.mask,
            placeholder: Postal.CA.placeholder,
            name: "postal_code",
            required: true,
        },
        city: {
            type: "text",
            name: "city",
            trans: "address_city",
            disabled: true,
            required: true,
        },
        state: {
            type: "choices",
            choices: State.CA,
            name: "state",
            trans: "address_state",
            disabled: true,
            required: true,
        },
        country: {
            type: "text",
            name: "country",
            value: "CA",
            trans: "address_country",
            disabled: true,
            required: true,
        },
    },
    FR: {
        logo: {
            type: "file",
            name: "logo",
            label_trans: "input_merchant_logo",
            format: "image/jpg,image/jpeg,image/png",
            multiple: false,
            required: true,
        },
        banner: {
            type: "file",
            name: "banner",
            label_trans: "input_merchant_banner",
            format: "image/jpg,image/jpeg,image/png",
            multiple: false,
            required: false,
        },
        ads: {
            type: "file",
            name: "ads",
            label_trans: "input_merchant_ads",
            format: "image/jpg,image/jpeg,image/png",
            multiple: true,
            required: false,
        },
        name: {
            type: "text",
            name: "name",
            label_trans: "input_merchant_name",
            required: true,
        },
        intro: {
            type: "text",
            name: "intro",
            label_trans: "input_merchant_intro",
            required: false,
        },
        description: {
            type: "textarea",
            name: "description",
            label_trans: "input_merchant_description",
            required: false,
        },
        mcc: {
            type: "choices",
            name: "mcc",
            choices: Mcc,
            label_trans: "input_merchant_mcc",
            trans: "choose",
            required: false,
            canSearch: true,
        },
        url: {
            type: "text",
            name: "url",
            label_trans: "input_merchant_url",
            placeholder: "https://www.example.com",
            note: "No website? Enter an App Store link, or a social profile.",
            required: false,
        },
        email: {
            type: "email",
            name: "email",
            label_trans: "input_merchant_email",
            required: true,
        },
        phone: {
            type: "mask",
            mask: Phone.FR.mask,
            placeholder: Phone.FR.placeholder,
            name: "phone",
            label_trans: "input_merchant_phone",
            required: true,
        },
        line1: {
            type: "text",
            name: "line1",
            label_trans: "input_merchant_address",
            trans: "address_line1",
            required: true,
        },
        line2: {
            type: "text",
            name: "line2",
            trans: "address_line2",
            required: false,
        },
        postal_code: {
            type: "mask",
            mask: Postal.FR.mask,
            placeholder: Postal.FR.placeholder,
            name: "postal_code",
            required: true,
        },
        city: {
            type: "text",
            name: "city",
            trans: "address_city",
            disabled: true,
            required: true,
        },
        country: {
            type: "text",
            name: "country",
            value: "FR",
            trans: "address_country",
            disabled: true,
            required: true,
        },
    },
};

export default Shop;

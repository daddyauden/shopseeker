import Phone from "model/phone";
import State from "model/country";
import Postal from "model/postal";

const identity = {
    CA: {
        individual: {
            first_name: {
                type: "text",
                name: "first_name",
                label_trans: "input_first_name",
                required: true,
            },
            last_name: {
                type: "text",
                name: "last_name",
                label_trans: "input_last_name",
                required: true,
            },
            gender: {
                type: "choices",
                choices: {
                    female: "female",
                    male: "male",
                },
                name: "gender",
                label_trans: "input_gender",
                trans: "choose",
                required: true,
            },
            dob: {
                type: "mask",
                mask: [
                    /[0-1]/,
                    /\d/,
                    "/",
                    /[0-3]/,
                    /\d/,
                    "/",
                    /[1-2]/,
                    /[0,9]/,
                    /\d/,
                    /\d/,
                ],
                placeholder: "MM/DD/YYYY",
                name: "dob",
                label_trans: "input_dob",
                required: true,
            },
            id_number: {
                type: "mask",
                mask: [
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    "-",
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    "-",
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                ],
                placeholder: "123-456-789",
                name: "id_number",
                label_trans: "input_sin",
                required: true,
            },
            email: {
                type: "email",
                name: "email",
                label_trans: "input_email",
                required: true,
            },
            phone: {
                type: "mask",
                mask: Phone.CA.mask,
                placeholder: Phone.CA.placeholder,
                name: "phone",
                label_trans: "input_phone",
                required: true,
            },
            line1: {
                type: "text",
                name: "line1",
                label_trans: "input_address",
                trans: "address_line1",
                required: true,
            },
            line2: {
                type: "text",
                name: "line2",
                trans: "address_line2",
                required: false,
            },
            city: {
                type: "text",
                name: "city",
                trans: "address_city",
                required: true,
            },
            state: {
                type: "choices",
                choices: State.CA,
                name: "state",
                trans: "address_state",
                required: true,
            },
            postal_code: {
                type: "mask",
                mask: Postal.CA.mask,
                placeholder: Postal.CA.placeholder,
                name: "postal_code",
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
        company: {
            name: {
                type: "text",
                name: "name",
                label_trans: "input_business_name",
                required: true,
            },
            tax_id: {
                type: "text",
                name: "tax_id",
                label_trans: "input_business_number",
                placeholder: "123456789",
                required: true,
            },
            phone: {
                type: "mask",
                mask: Phone.CA.mask,
                placeholder: Phone.CA.placeholder,
                name: "phone",
                label_trans: "input_phone",
                required: true,
            },
            line1: {
                type: "text",
                name: "line1",
                label_trans: "input_address",
                trans: "address_line1",
                required: true,
            },
            line2: {
                type: "text",
                name: "line2",
                trans: "address_line2",
                required: false,
            },
            city: {
                type: "text",
                name: "city",
                trans: "address_city",
                required: true,
            },
            state: {
                type: "choices",
                choices: State.CA,
                name: "state",
                trans: "address_state",
                required: true,
            },
            postal_code: {
                type: "mask",
                mask: Postal.CA.mask,
                placeholder: Postal.CA.placeholder,
                name: "postal_code",
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
    },
};

export default identity;

import _ from "lodash";

import Phone from "model/phone";
import State from "model/country";
import Postal from "model/postal";

const Person = {
    CA: {
        first_name: {
            className: "mb-4",
            type: "text",
            name: "first_name",
            label_trans: "input_first_name",
            required: true,
        },
        last_name: {
            className: "mb-4",
            type: "text",
            name: "last_name",
            label_trans: "input_last_name",
            required: true,
        },
        title: {
            className: "mb-4",
            type: "text",
            name: "title",
            label_trans: "input_job_title",
            placeholder: "CEO, Manager, Partner, Support Engineer...",
            required: true,
        },
        email: {
            type: "email",
            name: "email",
            label_trans: "input_email",
            required: true,
        },
        phone: {
            type: "phone",
            name: "phone",
            label_trans: "input_phone",
            placeholder: Phone.CA.placeholder,
            mask: Phone.CA.mask,
            required: true,
        },
        dob: {
            type: "date",
            name: "dob",
            label_trans: "input_dob",
            placeholder: "MM / DD / YYYY",
            required: true,
        },
        id_number: {
            className: "mb-4",
            type: "text",
            name: "id_number",
            label_trans: "input_sin",
            required: true,
        },
        line1: {
            className: "mb-2",
            type: "text",
            name: "line1",
            label_trans: "input_address",
            trans: "address_line1",
            required: true,
        },
        line2: {
            className: "mb-2",
            type: "text",
            name: "line2",
            trans: "address_line2",
            required: false,
        },
        city: {
            className: "mb-2",
            type: "text",
            name: "city",
            trans: "address_city",
            required: true,
        },
        state: {
            className: "mb-2",
            type: "choices",
            choices: State.CA,
            name: "state",
            trans: "address_state",
            required: true,
        },
        postal_code: {
            type: "postal_code",
            name: "postal_code",
            placeholder: Postal.CA.placeholder,
            mask: Postal.CA.mask,
            required: true,
        },
        country: {
            className: "mb-4",
            type: "text",
            name: "country",
            trans: "address_country",
            disabled: true,
            required: true,
        },
        // front: {
        //     className: "mb-2",
        //     type: "file",
        //     name: "verification_document_front",
        //     label_trans: "input_verification_document_front",
        //     required: false,
        // },
        // back: {
        //     className: "mb-4",
        //     type: "file",
        //     name: "verification_document_back",
        //     label_trans: "input_verification_document_back",
        //     required: false,
        // },
    },
};

export default Person;

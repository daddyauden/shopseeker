export default {
    CA: {
        mask: [/[a-zA-Z]/, /\d/, /[a-zA-Z]/, " ", /\d/, /[a-zA-Z]/, /\d/],
        placeholder: "H1H 1S2",
    },
    US: {
        mask: [/\d/, /\d/, /\d/, /\d/, /\d/],
        placeholder: "12345",
    },
    FR: {
        mask: [/\d/, /\d/, /\d/, /\d/, /\d/],
        placeholder: "75013",
    },
};

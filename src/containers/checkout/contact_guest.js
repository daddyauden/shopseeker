import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import MaskedInput from "react-text-mask";

import Model from "model/contact";

import { queryAddress } from "request/address";

import Lib from "helpers/lib";

import Div from "components/div";
import Text from "components/text";
import Input from "components/input";
import Select from "components/select";
import Button from "components/button";
import Loading from "components/loading";

import Locales from "locales";

import Style from "style";

const contactAddressKeys = [
    "first_name",
    "last_name",
    "phone",
    "line1",
    "line2",
    "city",
    "state",
    "country",
    "postal_code",
];

class ContactGuestModal extends Component {
    static defaultProps = {
        data: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            attrs: {},
            item: {},
            stableItem: {},
            showItems: {},
            requiredFields: {},
            message: "",
            canSubmit: false,
        };
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.data, this.props.data)) {
            this.init();
        }
    }

    init = () => {
        const { data, region } = this.props;

        const country = _.toUpper(region.country);

        try {
            let attrs = _.get(Model, country);

            if (!_.isEmpty(attrs)) {
                let item = {};
                let showItems = {};
                let requiredFields = {};

                for (let name in attrs) {
                    const { value, required } = attrs[name];

                    const defaultValue =
                        !_.isNil(value) && value
                            ? value
                            : !!_.get(data, name)
                            ? _.get(data, name)
                            : "";

                    item[name] =
                        name === "country" ? Locales.t(country) : defaultValue;

                    showItems[name] = true;

                    if (required === true) {
                        requiredFields[name] = true;
                    }
                }

                this.setState({
                    loading: false,
                    attrs,
                    item,
                    stableItem: item,
                    showItems,
                    requiredFields,
                });
            } else {
                this.setState({
                    loading: false,
                    message: Locales.t("error.unknown"),
                });
            }
        } catch (e) {
            this.setState({
                loading: false,
                message: Locales.t("error.unknown"),
            });
        }
    };

    getItem = (name) => {
        const { item } = this.state;

        let value = _.get(item, name, null);

        return value;
    };

    onChange = (name, value) => {
        const { item } = this.state;

        let _value = value;

        if (name === "postal_code") {
            _value = _.toUpper(value);
        } else if (name === "city") {
            _value = _.upperFirst(value);
        }

        this.setState(
            {
                item: {
                    ...item,
                    [name]: _value,
                },
            },
            () => {
                this.setHeader(name, _value);
            }
        );
    };

    setHeader = (name, value) => {
        const { stableItem, requiredFields } = this.state;

        let hasError = value !== _.get(stableItem, name, "") ? false : true;

        for (var itemName in requiredFields) {
            if (!this.getItem(itemName)) {
                hasError = true;
                break;
            }
        }

        this.setState({ canSubmit: !hasError });
    };

    sendRequest = async () => {
        const { setModalRender, region, getContact } = this.props;

        const { item } = this.state;

        setModalRender({
            headerRight: () => (
                <Text
                    style={[
                        Style.f_color_10,
                        Style.b,
                        Style.p_h_2,
                        Style.p_v_1,
                        Style.border_round_1,
                    ]}
                >
                    {Locales.t("save") + "..."}
                </Text>
            ),
        });

        _.set(item, "country", _.toUpper(region.country));

        const { status, data } = await queryAddress(item);

        if (status === "succeeded") {
            getContact({
                ...item,
                ...data,
            });

            this.sendRequestSuccess();
        } else {
            this.sendRequestFail();
        }
    };

    sendRequestSuccess = () => {
        const { setModalRender } = this.props;

        setModalRender({ hideModal: true });

        Lib.showToast({
            message: Locales.t("succeeded"),
            type: "success",
        });
    };

    sendRequestFail = () => {
        const { setModalRender } = this.props;

        setModalRender({ hideModal: true });

        Lib.showToast({
            message: Locales.t("failed"),
            type: "error",
        });
    };

    renderView = () => {
        const { attrs, showItems } = this.state;

        const inputs =
            _.size(attrs) > 0 &&
            _.map(attrs, (attr, index) => {
                let input;

                const {
                    type,
                    name,
                    placeholder,
                    trans,
                    mask,
                    label_trans,
                    label,
                    note_trans,
                    note,
                    disabled,
                    required,
                    multiple,
                    choices,
                    className,
                } = attr;

                const _label = !_.isNil(label_trans)
                    ? Locales.t(label_trans)
                    : !_.isNil(label)
                    ? label
                    : "";

                const _note = !_.isNil(note_trans)
                    ? Locales.t(note_trans)
                    : !_.isNil(note)
                    ? note
                    : "";

                const _placeholder = placeholder
                    ? placeholder
                    : trans
                    ? Locales.t(trans)
                    : "";

                switch (type) {
                    case "choices":
                        const options = _.reduce(
                            choices,
                            (res, value, key) => {
                                res.push({
                                    value: key,
                                    label: value,
                                });

                                return res;
                            },
                            []
                        );

                        input = (
                            <Select
                                value={_.get(
                                    _.find(options, [
                                        "value",
                                        this.getItem(name),
                                    ]),
                                    "label"
                                )}
                                options={options}
                                onChange={({ value }) => {
                                    this.onChange(name, value);
                                }}
                                placeholder={_placeholder}
                                disabled={disabled || false}
                                multiple={multiple}
                            />
                        );
                        break;

                    case "mask":
                        input = (
                            <Div
                                style={[
                                    Style.w_p100,
                                    Style.row,
                                    Style.row_start,
                                    Style.column_start,
                                    Style.bg_color_light,
                                    Style.border_round_1,
                                ]}
                            >
                                <MaskedInput
                                    id={name}
                                    name={name}
                                    value={this.getItem(name)}
                                    onChange={({ target: { value } }) => {
                                        this.onChange(name, value);
                                    }}
                                    guide={false}
                                    showMask={false}
                                    keepCharPositions={false}
                                    mask={mask}
                                    placeholder={_placeholder}
                                    style={{
                                        ...Style.input,
                                    }}
                                />
                            </Div>
                        );
                        break;

                    case "textarea":
                        input = (
                            <Input
                                id={name}
                                value={this.getItem(name)}
                                placeholder={_placeholder}
                                editable={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoFocus={false}
                                keyboardType={"default"}
                                onChangeText={(value) => {
                                    this.onChange(name, value);
                                }}
                            />
                        );
                        break;

                    case "number":
                        input = (
                            <Input
                                id={name}
                                value={"" + this.getItem(name)}
                                placeholder={_placeholder}
                                editable={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoFocus={false}
                                keyboardType="numeric"
                                onChangeText={(value) => {
                                    this.onChange(
                                        name,
                                        _.isNaN(value) ? 0 : _.toNumber(value)
                                    );
                                }}
                            />
                        );
                        break;

                    case "email":
                    case "text":
                    default:
                        input = (
                            <Input
                                id={name}
                                value={this.getItem(name)}
                                placeholder={_placeholder}
                                editable={!disabled}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoFocus={false}
                                keyboardType="default"
                                onChangeText={(value) => {
                                    this.onChange(name, value);
                                }}
                            />
                        );
                        break;
                }

                return _.get(showItems, name, false) === true ? (
                    <Div
                        key={index}
                        style={[
                            Style.column,
                            Style.column_start,
                            Style.row_center,
                            _.includes(contactAddressKeys, name)
                                ? Style.m_b_1
                                : Style.m_b_5,
                        ]}
                        className={className || ""}
                    >
                        {!_.isEmpty(_label) && (
                            <Text
                                style={[
                                    Style.m_b_1,
                                    Style.f_size_12,
                                    Style.f_weight_500,
                                    required
                                        ? Style.f_color_danger
                                        : Style.f_color_dark_medium,
                                ]}
                            >
                                {_label}
                            </Text>
                        )}
                        {input}
                        {!_.isEmpty(_note) && (
                            <Text
                                numberOfLines={1}
                                style={[Style.f_color_dark, Style.m_t_1]}
                            >
                                {_note}
                            </Text>
                        )}
                    </Div>
                ) : null;
            });

        return inputs;
    };

    render() {
        const { region } = this.props;

        const country = _.toUpper(_.get(region, "country", ""));

        if (!country) {
            return (
                <Div>
                    <Text style={[Style.f_size_13, Style.f_color_dark]}>
                        {Locales.t("error.unknown")}
                    </Text>
                </Div>
            );
        }

        const { loading, message, canSubmit } = this.state;

        if (loading) {
            return (
                <Div style={[Style.w_p100, Style.h_30, Style.v_center]}>
                    <Loading
                        type="bars"
                        size={Style.f_size_40.fontSize}
                        delay={100}
                    />
                </Div>
            );
        }

        if (message !== "") {
            return (
                <Div>
                    <Text style={[Style.f_size_13, Style.f_color_dark]}>
                        {message}
                    </Text>
                </Div>
            );
        }

        return (
            <Div style={[Style.w_p100]}>
                {this.renderView()}
                <Button
                    size="fullwidth"
                    trans="save"
                    disabled={!canSubmit}
                    onPress={this.sendRequest}
                    style={[Style.m_t_2]}
                />
            </Div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        region: state.region,
    };
};

export default connect(mapStateToProps)(ContactGuestModal);

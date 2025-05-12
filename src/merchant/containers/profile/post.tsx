import React, { Component, createRef } from "react";
import _ from "lodash";
import MaskedInput from "react-text-mask";
import Strapi from "strapi-sdk-javascript";
import { message as Message, Checkbox as AntCheckbox } from "antd";

import { Merchant } from "interfaces/profile";

import Config from "config";
import { HEADER_BAR_HEIGHT, FOOTER_BAR_HEIGHT } from "config/constant";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Input from "components/input";
import Button from "components/button";
import Select from "components/select";
import Loading from "components/loading";
import Checkbox from "components/checkbox";
import Uploader from "components/uploader";
import Textarea from "components/textarea";

import Lib from "helpers/lib";
import { getToken } from "helpers/profile";

import Locales from "locales";

import Style from "style";

import Model from "merchant/model";

import {
    getIdentify,
    updateIdentity,
    addExternalAccount,
    getExternalAccount,
    updateExternalAccount,
    removeExternalAccount,
    getRepresentative,
    updateRepresentative,
    getShop,
    updateShop,
    removeMerchantImage,
} from "merchant/request";

import Bank from "merchant/containers/bank";

import HeaderBar from "merchant/layout/header-bar";

const addressKeys = [
    "line1",
    "line2",
    "city",
    "state",
    "country",
    "postal_code",
];

type Props = {
    type: string;
    merchant: Merchant;
    changeNav: Function;
};

type State = {
    attrs: { [key: string]: object };
    attrsValue: { [key: string]: any };
    items: { [key: string]: any };
    stableItems: { [key: string]: any };
    showItems: { [key: string]: any };
    requiredItems: { [key: string]: any };
    loading: boolean;
    message: string;
    showAddBankBtn: boolean;
    headerRight: any;
    isAdd: boolean;
    files: { [key: string]: any };
    waitingForUpload: { [key: string]: any };
};

class ProfilePost extends Component<Props, State> {
    message = `The region you business registed was not opened, please contact with: ${Config.SUPPORT_EMAIL}`;

    state = {
        attrs: {},
        attrsValue: {},
        items: {},
        stableItems: {},
        showItems: {},
        requiredItems: {},
        loading: true,
        message: "",
        showAddBankBtn: true,
        headerRight: null,
        isAdd: true,
        files: {},
        waitingForUpload: {},
    };

    _container = createRef<HTMLDivElement>();

    componentDidMount() {
        setTimeout(() => {
            this.init();
        }, 1000);
    }

    init = async () => {
        try {
            const { type, merchant } = this.props;

            const merchantId = _.get(merchant, "id");
            const entity = _.toLower(_.get(merchant, "entity"));
            const country = _.toUpper(_.get(merchant, "country"));

            let _attrs: { [key: string]: any } = {};

            if (type === "identity") {
                _attrs = _.get(Model, `${type}.${country}.${entity}`);
            } else if (type === "external_account") {
                _attrs = _.get(Model, `${type}.${country}`);
            } else if (type === "shop") {
                _attrs = _.get(Model, `${type}.${country}`);
            } else if (type === "representative") {
                _attrs = _.get(Model, `${type}.${country}`);
            }

            if (_.isEmpty(_attrs)) {
                this.setState({
                    loading: false,
                    message: this.message,
                });

                return;
            }

            let requestHandler = getIdentify;

            if (type === "external_account") {
                requestHandler = getExternalAccount;
            } else if (type === "shop") {
                requestHandler = getShop;
            } else if (type === "representative") {
                requestHandler = getRepresentative;
            }

            const res = await requestHandler({
                merchantId,
                paymentProvider: Config.PAYMENT_PROVIDER,
                businessType: entity,
            });

            if (_.isNil(res)) {
                this.setState({
                    loading: false,
                    message: this.message,
                });

                return;
            } else if (_.get(res, "status") === "failed") {
                this.setState({
                    loading: false,
                    message: this.message,
                });

                return;
            }

            let isAdd = true;

            let _items: { [key: string]: any } = {};
            let _showItems: { [key: string]: any } = {};
            let _requiredItems: { [key: string]: any } = {};
            let _attrsValue: { [key: string]: any } = {};

            let _files: { [key: string]: any } = {};

            if (
                _.get(res, "status") === "succeeded" &&
                _.has(res, "data") &&
                !_.isEmpty(_.get(res, "data"))
            ) {
                _attrsValue = res.data;

                isAdd = false;
            }

            for (let name in _attrs) {
                const {
                    value,
                    required,
                    show,
                    type: fieldType,
                    multiple,
                } = _attrs[name];

                const defaultValue =
                    type === "external_account"
                        ? null
                        : !_.isNil(value) && value
                        ? value
                        : _.get(_attrsValue, name) !== undefined
                        ? _.get(_attrsValue, name)
                        : null;

                _items[name] =
                    _.isNil(defaultValue) && name == "url"
                        ? window.location.origin + "/shop/" + merchantId
                        : defaultValue;

                if (name === "country") {
                    _items[name] = Locales.t(country);
                } else if (name === "currency") {
                    _items[name] = _.toUpper(
                        _.get(_attrsValue, "currency") || value
                    );
                } else if (fieldType === "file") {
                    if (multiple) {
                        _items[name] = _.isNil(defaultValue)
                            ? null
                            : _.map(defaultValue, (file) =>
                                  _.get(file, "id", null)
                              );
                        _files[name] = _.isNil(defaultValue)
                            ? []
                            : _.map(defaultValue, (file) =>
                                  _.pick(file, ["id", "name", "url"])
                              );
                    } else {
                        _items[name] = _.isNil(defaultValue)
                            ? null
                            : _.get(defaultValue, "id", null);
                        _files[name] = _.isNil(defaultValue)
                            ? []
                            : [_.pick(defaultValue, ["id", "name", "url"])];
                    }
                }

                _showItems[name] =
                    (name === "ssn_last_4" &&
                        _.get(_attrsValue, "ssn_last_4_provided") === true) ||
                    (name === "id_number" &&
                        _.get(_attrsValue, "id_number_provided") === true) ||
                    (name === "tax_id" &&
                        _.get(_attrsValue, "tax_id_provided") === true) ||
                    (name === "vat_id" &&
                        _.get(_attrsValue, "vat_id_provided") === true)
                        ? false
                        : show === false
                        ? false
                        : true;

                if (required === true) {
                    _requiredItems[name] = true;
                }
            }

            this.setState({
                attrs: _attrs,
                attrsValue: _attrsValue,
                items: _items,
                stableItems: _items,
                showItems: _showItems,
                requiredItems: _requiredItems,
                files: _files,
                loading: false,
                headerRight: (
                    <Text
                        style={[
                            Style.f_color_10,
                            Style.b,
                            Style.p_h_2,
                            Style.p_v_1,
                            Style.border_round_1,
                        ]}
                    >
                        {Locales.t(isAdd ? "add" : "save")}
                    </Text>
                ),
                isAdd,
            });
        } catch (e) {
            this.setState({
                loading: false,
                message: this.message,
            });
        }
    };

    getItem = (name: string) => {
        const { items } = this.state;

        return _.get(items, name);
    };

    getFile = (name: string) => {
        const { files } = this.state;

        return _.get(files, name);
    };

    uploadFile = (name, value) => {
        if (!_.isNil(value)) {
            const { waitingForUpload } = this.state;
            const _value = value;

            this.setState({
                waitingForUpload: {
                    ...waitingForUpload,
                    [name]: _value,
                },
            });

            this.onChange(name, _value);
        }
    };

    deleteFile = async (name, file) => {
        if (_.has(file, "id")) {
            const { attrs, items, files } = this.state;
            const { merchant } = this.props;

            try {
                const res = await removeMerchantImage({
                    merchantId: _.get(merchant, "id"),
                    field: name,
                    fileId: _.get(file, "id", ""),
                });

                if (_.get(res, "status") === "succeeded") {
                    const { multiple } = attrs[name];

                    if (multiple) {
                        this.onChange(
                            name,
                            _.filter(
                                items[name],
                                (_fileId) =>
                                    _fileId &&
                                    !_.isEqual(_fileId, _.get(file, "id"))
                            )
                        );
                        this.setState({
                            files: {
                                ...files,
                                [name]: _.filter(
                                    files[name],
                                    (_file) =>
                                        !_.isEqual(
                                            _.get(_file, "id"),
                                            _.get(file, "id")
                                        )
                                ),
                            },
                        });
                    } else {
                        this.onChange(name, null);
                        this.setState({
                            files: {
                                ...files,
                                [name]: [],
                            },
                        });
                    }
                }
            } catch (e: any) {
                this.sendRequestFail(e.message);
            }
        }
    };

    onChange = (name: string, value: any) => {
        const { items } = this.state;

        let _value = value;

        if (name === "postal_code") {
            _value = _.toUpper(value);
        } else if (name === "city") {
            _value = _.upperFirst(value);
        }

        this.setState(
            {
                items: {
                    ...items,
                    [name]: _value,
                },
            },
            () => {
                this.setHeader(name, _value);
            }
        );
    };

    setHeader = (name: string, value: any) => {
        const { attrsValue, stableItems, requiredItems, isAdd } = this.state;

        let hasError = value !== _.get(stableItems, name, null) ? false : true;

        if (!hasError) {
            for (var itemName in requiredItems) {
                if (
                    (itemName === "id_number" &&
                        _.get(attrsValue, "id_number_provided") === true) ||
                    (itemName === "ssn_last_4" &&
                        _.get(attrsValue, "ssn_last_4_provided") === true) ||
                    (itemName === "tax_id" &&
                        _.get(attrsValue, "tax_id_provided") === true) ||
                    (itemName === "vat_id" &&
                        _.get(attrsValue, "vat_id_provided") === true)
                ) {
                    continue;
                } else {
                    const _value = this.getItem(itemName);

                    if (_.isNil(_value) || !_value) {
                        hasError = true;
                        break;
                    }
                }
            }
        }

        if (hasError === false) {
            this.setState({
                headerRight: (
                    <A onPress={this.sendRequest}>
                        <Text
                            style={[
                                Style.border_round_1,
                                Style.p_h_2,
                                Style.p_v_1,
                                Style.bg_color_primary,
                                Style.f_color_15,
                                Style.overflow_hidden,
                            ]}
                        >
                            {Locales.t(isAdd ? "add" : "save")}
                        </Text>
                    </A>
                ),
            });
        } else {
            this.setState({
                headerRight: (
                    <Text
                        style={[
                            Style.f_color_10,
                            Style.b,
                            Style.p_h_2,
                            Style.p_v_1,
                            Style.border_round_1,
                        ]}
                    >
                        {Locales.t(isAdd ? "add" : "save")}
                    </Text>
                ),
            });
        }
    };

    preSendRequest = async (files) => {
        let data: any = [];

        const strapi = new Strapi(Config.HOST as string);

        if (!_.isEmpty(files)) {
            const form = new FormData();
            files.map((file: any) => {
                form.append("files", file, file.name);
            });

            try {
                const token = await getToken();
                const headers = {};

                if (token) {
                    _.set(headers, "Authorization", "Bearer " + token);
                }

                const res: any = await strapi.upload(form, {
                    headers: headers,
                });

                if (_.isArray(res)) {
                    if (res.length === 1) {
                        const fileId = _.get(res, "0.id", "");
                        if (fileId) {
                            data = [_.pick(res[0], ["id", "name", "url"])];
                        }
                    } else if (res.length > 1) {
                        let fileIds: string[] = [];

                        _.forEach(res, (file) => {
                            const fileId: string = _.get(file, "id", "");

                            if (fileId) {
                                fileIds.push(
                                    _.pick(file, ["id", "name", "url"])
                                );
                            }
                        });

                        if (!_.isEmpty(fileIds)) {
                            data = fileIds;
                        }
                    }
                }
            } catch (e) {
                data = [];
            }
        }

        return data;
    };

    sendRequest = async () => {
        const { waitingForUpload, files, items, attrs, attrsValue } =
            this.state;
        const { type, merchant, changeNav } = this.props;

        const merchantId = _.get(merchant, "id");
        const entity = _.toLower(_.get(merchant, "entity", ""));
        const country = _.toUpper(_.get(merchant, "country"));

        this.setState({
            headerRight: (
                <Loading
                    delay={0}
                    type="bubbles"
                    color={Style.f_color_primary.color}
                    size={Style.f_size_30.fontSize}
                />
            ),
        });

        let filesData = {
            ...files,
        };

        if (!_.isEmpty(_.values(waitingForUpload))) {
            let _files = {};

            for (const fieldName in waitingForUpload) {
                if (
                    !_.isNil(waitingForUpload[fieldName]) &&
                    !_.isEmpty(waitingForUpload[fieldName])
                ) {
                    const res = await this.preSendRequest(
                        waitingForUpload[fieldName]
                    );

                    if (!_.isEmpty(res)) {
                        _files[fieldName] = res;
                    }
                }
            }

            _.each(filesData, (value, key) => {
                if (
                    _.has(_files, key) &&
                    !_.isNil(_files[key]) &&
                    !_.isEmpty(_files[key])
                ) {
                    filesData[key] = [...value, ..._files[key]];
                }
            });
        }

        _.each(filesData, (files, key) => {
            if (_.isNil(files)) {
                filesData[key] = null;
            } else if (_.isArray(files) && !_.isEmpty(files)) {
                filesData[key] = _.map(files, (file) => file.id);

                if (_.get(attrs, `${key}.multiple`) === false) {
                    filesData[key] = filesData[key][0];
                }
            } else if (_.get(attrs, `${key}.multiple`) === true) {
                filesData[key] = [];
            } else {
                filesData[key] = null;
            }
        });

        let requestData: any = {
            ...items,
            ...filesData,
            country,
            merchantId,
            paymentProvider: Config.PAYMENT_PROVIDER,
            businessType: entity,
        };

        let requestHandler = updateIdentity;

        if (type === "identity") {
            if (
                _.get(attrsValue, "id_number_provided") === true &&
                !_.get(requestData, "id_number")
            ) {
                requestData = _.omit(requestData, ["id_number"]);
            }

            if (
                _.get(attrsValue, "ssn_last_4_provided") === true &&
                !_.get(requestData, "ssn_last_4")
            ) {
                requestData = _.omit(requestData, ["ssn_last_4"]);
            }

            if (
                _.get(attrsValue, "tax_id_provided") === true &&
                !_.get(requestData, "tax_id")
            ) {
                requestData = _.omit(requestData, ["tax_id"]);
            }

            if (
                _.get(attrsValue, "vat_id_provided") === true &&
                !_.get(requestData, "vat_id")
            ) {
                requestData = _.omit(requestData, ["vat_id"]);
            }
        } else if (type === "external_account") {
            requestHandler = addExternalAccount;

            _.set(
                requestData,
                "currency",
                _.toLower(_.get(requestData, "currency"))
            );
        } else if (type === "shop") {
            requestHandler = updateShop;
        } else if (type === "representative") {
            if (
                _.get(attrsValue, "id_number_provided") === true &&
                !_.get(requestData, "id_number")
            ) {
                requestData = _.omit(requestData, ["id_number"]);
            }

            if (
                _.get(attrsValue, "ssn_last_4_provided") === true &&
                !_.get(requestData, "ssn_last_4")
            ) {
                requestData = _.omit(requestData, ["ssn_last_4"]);
            }

            requestHandler = updateRepresentative;
        }

        const { status } = await requestHandler(requestData);

        if (status === "succeeded") {
            this.sendRequestSuccess();
        } else {
            this.sendRequestFail();
        }

        changeNav("home");
    };

    sendRequestSuccess = (callback: any = null) => {
        Lib.showToast({
            message: Locales.t("succeeded"),
            type: "success",
            onClose: callback,
        });
    };

    sendRequestFail = (message: string = "", callback: any = null) => {
        Lib.showToast({
            message: message === "" ? Locales.t("failed") : message,
            type: "error",
            onClose: callback,
        });
    };

    renderView = () => {
        const { type } = this.props;

        const { attrs, showItems, showAddBankBtn } = this.state;

        const inputs =
            _.size(attrs) > 0 &&
            _.map(attrs, (attr: any, index: number) => {
                let input;

                const {
                    type,
                    name,
                    placeholder,
                    trans,
                    mask,
                    format,
                    label_trans,
                    label,
                    note_trans,
                    note,
                    disabled,
                    required,
                    multiple,
                    choices,
                    canSearch,
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
                    case "file":
                        input = (
                            <Uploader
                                width={`${
                                    _.toNumber(
                                        this._container.current?.getBoundingClientRect()
                                            .width
                                    ) - 60
                                }px`}
                                height={`${
                                    _.toNumber(
                                        this._container.current?.getBoundingClientRect()
                                            .width
                                    ) /
                                        2 -
                                    60
                                }px`}
                                value={this.getFile(name)}
                                format={format}
                                multiple={multiple}
                                uploadFile={(value) =>
                                    this.uploadFile(name, value)
                                }
                                deleteFile={(value) =>
                                    this.deleteFile(name, value)
                                }
                            />
                        );
                        break;

                    case "choices":
                        let options = !_.isNil(choices)
                            ? _.reduce(
                                  choices,
                                  (res: any[], value: string, key: string) => {
                                      res.push({
                                          value: key,
                                          label: value,
                                      });

                                      return res;
                                  },
                                  []
                              )
                            : null;

                        if (name === "gender") {
                            options = _.map(choices, (value: string) => {
                                return {
                                    value: value,
                                    label: Locales.t(value),
                                };
                            });
                        }

                        input = (
                            <Select
                                value={this.getItem(name)}
                                options={options}
                                onChange={({ value }) => {
                                    this.onChange(name, value);
                                }}
                                placeholder={_placeholder}
                                disabled={disabled}
                                multiple={multiple}
                                showSearch={canSearch || false}
                                optionFilterProp={
                                    name === "mcc" ? "label" : "children"
                                }
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
                            <Textarea
                                id={name}
                                value={this.getItem(name)}
                                placeholder={_placeholder}
                                editable={true}
                                autoFocus={false}
                                onChangeText={(value) => {
                                    this.onChange(name, value);
                                }}
                            />
                        );
                        break;

                    case "checkbox":
                        input =
                            name === "relationship" ? (
                                <AntCheckbox.Group
                                    name={name}
                                    defaultValue={["representative"]}
                                    value={this.getItem(name)}
                                    options={[
                                        {
                                            label: (
                                                <Div
                                                    style={[
                                                        Style.column,
                                                        Style.row_center,
                                                        Style.m_b_2,
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            Style.f_size_13,
                                                            Style.f_weight_500,
                                                        ]}
                                                    >
                                                        {Locales.t(
                                                            "relationship_representative"
                                                        )}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            Style.f_size_11,
                                                            Style.f_color_dark,
                                                        ]}
                                                    >
                                                        {Locales.t(
                                                            "relationship_representative_desc"
                                                        )}
                                                    </Text>
                                                </Div>
                                            ),
                                            value: "representative",
                                            disabled: true,
                                        },
                                        {
                                            label: (
                                                <Div
                                                    style={[
                                                        Style.column,
                                                        Style.row_center,
                                                        Style.m_b_2,
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            Style.f_size_13,
                                                            Style.f_weight_500,
                                                        ]}
                                                    >
                                                        {Locales.t(
                                                            "relationship_director"
                                                        )}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            Style.f_size_11,
                                                            Style.f_color_dark,
                                                        ]}
                                                    >
                                                        {Locales.t(
                                                            "relationship_director_desc"
                                                        )}
                                                    </Text>
                                                </Div>
                                            ),
                                            value: "director",
                                        },
                                        {
                                            label: (
                                                <Div
                                                    style={[
                                                        Style.column,
                                                        Style.row_center,
                                                        Style.m_b_2,
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            Style.f_size_13,
                                                            Style.f_weight_500,
                                                        ]}
                                                    >
                                                        {Locales.t(
                                                            "relationship_executive"
                                                        )}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            Style.f_size_11,
                                                            Style.f_color_dark,
                                                        ]}
                                                    >
                                                        {Locales.t(
                                                            "relationship_executive_desc"
                                                        )}
                                                    </Text>
                                                </Div>
                                            ),
                                            value: "executive",
                                        },
                                        {
                                            label: (
                                                <Div
                                                    style={[
                                                        Style.column,
                                                        Style.row_center,
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            Style.f_size_13,
                                                            Style.f_weight_500,
                                                        ]}
                                                    >
                                                        {Locales.t(
                                                            "relationship_owner"
                                                        )}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            Style.f_size_11,
                                                            Style.f_color_dark,
                                                        ]}
                                                    >
                                                        {Locales.t(
                                                            "relationship_owner_desc"
                                                        )}
                                                    </Text>
                                                </Div>
                                            ),
                                            value: "owner",
                                        },
                                    ]}
                                    onChange={(values) => {
                                        this.onChange(name, values);
                                    }}
                                />
                            ) : (
                                <Checkbox
                                    id={name}
                                    value={this.getItem(name)}
                                    onChangeText={(value) => {
                                        this.onChange(name, !!value);
                                    }}
                                />
                            );
                        break;

                    case "number":
                        input = (
                            <Input
                                type="number"
                                id={name}
                                value={this.getItem(name)}
                                placeholder={_placeholder}
                                editable={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoFocus={false}
                                keyboardType="decimal-pad"
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

                if (
                    name === "ssn_last_4" ||
                    name === "id_number" ||
                    name === "tax_id" ||
                    name === "vat_id"
                ) {
                    return (
                        <Div
                            key={index}
                            style={[
                                Style.column,
                                Style.column_start,
                                Style.row_center,
                                _.includes(addressKeys, name)
                                    ? Style.m_b_1
                                    : Style.m_b_5,
                            ]}
                        >
                            {!_.isEmpty(_label) && (
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        Style.m_b_1,
                                        Style.f_size_14,
                                        Style.f_weight_500,
                                        required
                                            ? Style.f_color_danger
                                            : Style.f_color_dark_medium,
                                    ]}
                                >
                                    {_label}
                                </Text>
                            )}
                            {_.get(showItems, name) === false && (
                                <Div style={[Style.row, Style.column_center]}>
                                    <Icon
                                        name="checkmark-circle"
                                        size={Style.f_size_30.fontSize}
                                        color={Style.f_color_success.color}
                                    />
                                    <Text
                                        style={[
                                            Style.f_size_13,
                                            Style.f_color_dark,
                                            Style.f_weight_500,
                                            Style.m_h_2,
                                        ]}
                                    >
                                        {Locales.t("provided")}
                                    </Text>
                                    <Button
                                        size="small"
                                        trans="change"
                                        style={[
                                            {
                                                paddingTop: 3,
                                                paddingBottom: 3,
                                            },
                                            Style.bg_color_15,
                                            Style.b_13,
                                        ]}
                                        titleStyle={[
                                            Style.f_size_13,
                                            Style.f_color_dark,
                                            Style.f_weight_500,
                                        ]}
                                        onPress={() => {
                                            this.setState({
                                                showItems: {
                                                    ...showItems,
                                                    [name]: true,
                                                },
                                            });
                                        }}
                                    />
                                </Div>
                            )}
                            {_.get(showItems, name, false) && (
                                <Div style={[Style.row, Style.column_center]}>
                                    <A
                                        style={[Style.m_r_2]}
                                        onClick={() => {
                                            this.setState(
                                                {
                                                    showItems: {
                                                        ...showItems,
                                                        [name]: false,
                                                    },
                                                },
                                                () => {
                                                    this.onChange(name, null);
                                                }
                                            );
                                        }}
                                    >
                                        <Icon
                                            name="arrow-undo-outline"
                                            size={Style.f_size_25.fontSize}
                                            color={
                                                Style.f_color_dark_medium.color
                                            }
                                        />
                                    </A>
                                    {input}
                                </Div>
                            )}
                            {!_.isEmpty(_note) && (
                                <Text
                                    style={[
                                        Style.f_size_13,
                                        Style.f_color_dark,
                                        Style.white_space_normal,
                                        Style.m_t_1,
                                    ]}
                                >
                                    {_note}
                                </Text>
                            )}
                        </Div>
                    );
                } else {
                    return _.get(showItems, name) === true ||
                        (name === "percent_ownership" &&
                            _.includes(
                                this.getItem("relationship"),
                                "owner"
                            )) ? (
                        <Div
                            key={index}
                            style={[
                                Style.column,
                                Style.column_start,
                                Style.row_center,
                                _.includes(addressKeys, name)
                                    ? Style.m_b_1
                                    : Style.m_b_5,
                            ]}
                        >
                            {!_.isEmpty(_label) && (
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        Style.m_b_1,
                                        Style.f_size_14,
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
                                    style={[
                                        Style.f_size_13,
                                        Style.f_color_dark,
                                        Style.white_space_normal,
                                        Style.m_t_1,
                                    ]}
                                >
                                    {_note}
                                </Text>
                            )}
                        </Div>
                    ) : null;
                }
            });

        return (
            <Div style={{ paddingTop: HEADER_BAR_HEIGHT }}>
                {type === "external_account" && showAddBankBtn && (
                    <A onPress={() => this.setState({ showAddBankBtn: false })}>
                        <Div style={[Style.p_v_6, Style.h_center]}>
                            <Div
                                style={[
                                    Style.h_center,
                                    Style.p_v_1,
                                    Style.p_h_2,
                                    Style.b_light_dark,
                                    Style.border_round_1,
                                ]}
                            >
                                <Icon
                                    name="add"
                                    size={Style.f_size_20.fontSize}
                                    color={Style.f_color_dark_medium.color}
                                />
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        Style.m_l_2,
                                        Style.f_size_15,
                                        Style.f_weight_500,
                                        Style.f_color_dark_medium,
                                    ]}
                                >
                                    {Locales.t("addBankAccount")}
                                </Text>
                            </Div>
                        </Div>
                    </A>
                )}
                {type === "external_account" && !showAddBankBtn && (
                    <Div style={[Style.column, Style.p_4]}>
                        {inputs}
                        <Button
                            size="medium"
                            trans="cancel"
                            titleStyle={[
                                Style.f_size_15,
                                Style.f_weight_500,
                                Style.f_color_dark_medium,
                            ]}
                            style={[
                                Style.bg_color_light,
                                Style.border_round_1,
                                Style.p_v_2,
                                Style.p_h_4,
                                Style.m_t_2,
                            ]}
                            onPress={() =>
                                this.setState({ showAddBankBtn: true })
                            }
                        />
                    </Div>
                )}
                {type === "external_account" &&
                    showAddBankBtn &&
                    this.renderBankAccounts()}
                {type !== "external_account" && (
                    <Div style={[Style.p_4]}>{inputs}</Div>
                )}
            </Div>
        );
    };

    renderBankAccounts = () => {
        const { attrsValue } = this.state;

        return !_.isEmpty(attrsValue) ? (
            <Div style={[Style.p_h_4]}>
                <Text
                    style={[Style.f_size_13, Style.f_weight_500, Style.m_v_4]}
                >
                    {Locales.t("alreadyHaveBankAccounts")}
                </Text>
                {_.map(
                    _.orderBy(
                        attrsValue,
                        ["currency", "default_for_currency"],
                        ["asc", "desc"]
                    ),
                    (attr: any, index: number) => (
                        <Bank
                            key={index}
                            data={attr}
                            updateHandler={this.updateExternalAccount}
                            removeHandler={this.removeExternalAccountAlert}
                        />
                    )
                )}
            </Div>
        ) : null;
    };

    updateExternalAccount = (data: object) => {
        const {
            merchant: { id, entity },
        } = this.props;

        if (!_.get(data, "bankId")) {
            this.sendRequestFail();
            return;
        }

        Message.loading("")
            .then(() => {
                return updateExternalAccount({
                    merchantId: id,
                    paymentProvider: Config.PAYMENT_PROVIDER,
                    businessType: _.toLower(entity),
                    bankId: _.get(data, "bankId"),
                    data: _.omit(data, ["bankId"]),
                });
            })
            .then((res) => {
                if (_.get(res, "status") === "succeeded") {
                    Message.success(Locales.t("succeeded"), 1, this.init);
                } else {
                    Message.warning(Locales.t("failed"), 1);
                }
            });
    };

    removeExternalAccountAlert = (data: object) => {
        this.removeExternalAccount(data);
    };

    removeExternalAccount = async (data: object) => {
        const {
            merchant: { id, entity },
        } = this.props;

        if (!_.get(data, "bankId")) {
            this.sendRequestFail();
            return;
        }

        Message.loading("")
            .then(() => {
                return removeExternalAccount({
                    merchantId: id,
                    paymentProvider: Config.PAYMENT_PROVIDER,
                    businessType: _.toLower(entity),
                    bankId: _.get(data, "bankId"),
                });
            })
            .then((res) => {
                if (_.get(res, "status") === "succeeded") {
                    Message.success(Locales.t("succeeded"), 1, this.init);
                } else {
                    Message.warning(Locales.t("failed"), 1);
                }
            });
    };

    render() {
        const { type, merchant, changeNav } = this.props;

        const merchantId = _.get(merchant, "id", "");
        const entity = _.toLower(_.get(merchant, "entity", ""));
        const country = _.toUpper(_.get(merchant, "country", ""));

        if (
            _.isNil(merchantId) ||
            !merchantId ||
            _.isNil(entity) ||
            !entity ||
            _.isNil(country) ||
            !country ||
            _.isNil(type) ||
            !type
        ) {
            return (
                <Div
                    ref={this._container}
                    style={[Style.w_p100, Style.h_p100, Style.v_center]}
                >
                    {this.message}
                </Div>
            );
        }

        if (!_.includes(["individual", "company"], _.toLower(entity))) {
            return (
                <Div
                    ref={this._container}
                    style={[Style.w_p100, Style.h_p100, Style.v_center]}
                >
                    {this.message}
                </Div>
            );
        }

        const { loading, message, headerRight } = this.state;

        if (loading) {
            return (
                <Div
                    ref={this._container}
                    style={[Style.w_p100, Style.h_p100, Style.v_center]}
                >
                    <Loading />
                </Div>
            );
        }

        if (message !== "") {
            return (
                <Div
                    ref={this._container}
                    style={[
                        Style.w_p100,
                        Style.h_p100,
                        Style.column,
                        Style.column_center,
                    ]}
                >
                    {this.message}
                </Div>
            );
        }

        return (
            <Div
                ref={this._container}
                style={[
                    Style.column,
                    Style.w_p100,
                    Style.h_p100,
                    Style.bg_color_15,
                    Style.overflow_y_auto,
                    {
                        paddingBottom: FOOTER_BAR_HEIGHT,
                    },
                ]}
            >
                <HeaderBar
                    headerLeft={
                        <A
                            style={[Style.h_center]}
                            onPress={() => changeNav("home")}
                        >
                            <Icon
                                name="chevron-back"
                                size={Style.f_size_15.fontSize}
                                color={Style.f_color_dark_medium.color}
                            />
                            <Text
                                style={[
                                    Style.f_size_15,
                                    Style.f_color_dark_medium,
                                    Style.f_weight_500,
                                    Style.m_l_1,
                                ]}
                            >
                                {Locales.t("back")}
                            </Text>
                        </A>
                    }
                    headerRight={headerRight}
                    style={{
                        ...Style.bg_color_15,
                        ...Style.shadow_all,
                        width: this._container.current?.getBoundingClientRect()
                            .width,
                    }}
                />

                {this.renderView()}
            </Div>
        );
    }
}

export default ProfilePost;

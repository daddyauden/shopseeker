import React, { FC, useState, useCallback } from "react";
import _ from "lodash";
import { useDropzone } from "react-dropzone";

import Config from "config";
import { MAX_FILES_UPLOAD, MAX_SIZE_UPLOAD } from "config/constant";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import { trans } from "locales";

import Style from "style";

type Props = {
    width: any;
    height: any;
    value: any;
    format: string;
    multiple: boolean;
    disabled?: boolean;
    uploadFile: Function;
    deleteFile: Function;
    changeCover?: Function;
};

const Uploader: FC<Props> = ({
    width,
    // height,
    value,
    format,
    multiple,
    disabled,
    uploadFile,
    deleteFile,
    changeCover,
}) => {
    const images: any = [];

    if (_.isPlainObject(value) && _.has(value, "url")) {
        images.push({
            ...value,
            new: false,
            preview: Config.MEDIA_HOST + value.url,
        });
    } else if (_.isArray(value)) {
        _.map(value, (image: any) => {
            if (_.isPlainObject(image) && _.has(image, "url")) {
                images.push({
                    ...image,
                    new: false,
                    preview: Config.MEDIA_HOST + image.url,
                });
            }
        });
    }

    const [files, setFiles] = useState(images);
    const [errors, setErrors] = useState([]);

    const canUploadFiles =
        (multiple === false ? 1 : MAX_FILES_UPLOAD) - _.size(files);
    const _disabled = _.toNumber(canUploadFiles) <= 0 ? true : disabled;

    const { getRootProps, getInputProps } = useDropzone({
        accept: format,
        disabled: _disabled,
        multiple: multiple,
        maxSize: MAX_SIZE_UPLOAD,
        maxFiles: canUploadFiles,
        onDrop: useCallback(
            (acceptedFiles, fileRejections) => {
                if (!_.isEmpty(fileRejections)) {
                    let _errors = {};
                    _.map(fileRejections, ({ errors }) => {
                        _.map(
                            errors,
                            ({
                                code,
                                message,
                            }: {
                                code: string;
                                message: string;
                            }) => {
                                if (!_.has(_errors, code)) {
                                    _errors[code] = message;
                                }
                            }
                        );
                    });

                    if (!_.isEmpty(_errors)) {
                        setErrors(_.values(_errors));
                    }
                }

                const _acceptedFiles = _.reduce(
                    acceptedFiles,
                    (res, file) => {
                        const { type } = file;

                        let fileType = "";

                        switch (type) {
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

                        if (fileType !== "") {
                            res.unshift(
                                _.assign(file, {
                                    new: true,
                                    preview: URL.createObjectURL(file),
                                })
                            );
                        }

                        return res;
                    },
                    []
                );

                setLocaleFiles([..._acceptedFiles, ...files]);
            },
            [files]
        ),
    });

    const setLocaleFiles = (files) => {
        uploadFile(_.filter(files, (file) => _.get(file, "new") === true));

        setFiles(files);
    };

    const removeFile = (_file) => {
        setLocaleFiles(
            _.filter(files, (file) => !_.isEqual(file.preview, _file.preview))
        );

        if (_.get(_file, "new") !== true) {
            deleteFile(_file);
        }
    };

    const setCover = (file) => {
        setLocaleFiles(
            _.map(files, (_file) =>
                _.assign(_file, {
                    cover: _.isEqual(file.preview, _file.preview),
                })
            )
        );

        if (_.get(file, "new") !== true && _.has(file, "id")) {
            changeCover && changeCover(file.id);
        }
    };

    const thumbs = _.map(files, (file: any, index: number) => (
        <Div
            key={index}
            style={[
                Style.column,
                Style.m_b_2,
                Style.b_img,
                Style.position_relative,
            ]}
        >
            <Div
                style={[
                    Style.v_center,
                    {
                        width: `calc(${width} / 2.05)`,
                        height: `calc(${width} / 1.4)`,
                    },
                ]}
            >
                <img
                    src={file.preview}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                />
            </Div>
            <Div
                style={[
                    Style.w_p100,
                    Style.bottom_horizontal,
                    Style.row,
                    Style.column_center,
                    Style.row_end,
                    Style.bg_color_15_transparent_8,
                    Style.p_2,
                ]}
            >
                {changeCover &&
                    (_.get(file, "cover", false) === true ? (
                        <Div
                            style={[
                                Style.w_p100,
                                Style.row,
                                Style.column_center,
                                Style.row_start,
                            ]}
                        >
                            <Text
                                style={[
                                    Style.f_size_13,
                                    Style.f_weight_600,
                                    Style.f_color_primary,
                                ]}
                            >
                                {trans("isCover")}
                            </Text>
                        </Div>
                    ) : (
                        <Div
                            style={[
                                Style.w_p100,
                                Style.row,
                                Style.column_center,
                                Style.row_start,
                            ]}
                        >
                            <A onPress={() => setCover(file)}>
                                <Text
                                    style={[
                                        Style.f_size_13,
                                        Style.f_weight_600,
                                        Style.f_color_5,
                                    ]}
                                >
                                    {trans("setCover")}
                                </Text>
                            </A>
                        </Div>
                    ))}
                <A onPress={() => removeFile(file)}>
                    <Icon
                        name="trash-outline"
                        size={Style.f_size_25.fontSize}
                        color={Style.f_color_0.color}
                    />
                </A>
            </Div>
        </Div>
    ));

    return (
        <Div style={[Style.column, Style.w_p100]}>
            <Div
                style={[
                    Style.v_center,
                    Style.bg_color_light,
                    Style.p_3,
                    Style.outline_hide,
                ]}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <Div style={[Style.h_center]}>
                    {_disabled ? (
                        <Icon
                            name="cloud-upload-off-outline"
                            size={Style.f_size_40.fontSize}
                            color={Style.f_color_dark.color}
                        />
                    ) : (
                        <Icon
                            name="cloud-upload-outline"
                            size={Style.f_size_40.fontSize}
                            color={Style.f_color_dark_medium.color}
                        />
                    )}
                </Div>
                {!_.isEmpty(errors) && _.isEmpty(files) && (
                    <Div style={[Style.w_p100, Style.column, Style.row_center]}>
                        {_.map(errors, (error: string) => (
                            <Text
                                style={[
                                    Style.m_v_1,
                                    Style.f_size_13,
                                    Style.f_color_danger,
                                    Style.white_space_normal,
                                ]}
                            >
                                {error}
                            </Text>
                        ))}
                    </Div>
                )}
            </Div>
            <Div style={[Style.row, Style.column_center, Style.m_t_2]}>
                <Text
                    style={[
                        Style.f_size_12,
                        Style.f_color_dark,
                        Style.white_space_normal,
                    ]}
                >
                    {trans(
                        multiple
                            ? "uploadMultipleRequirement"
                            : "uploadSingleRequirement"
                    )}
                </Text>
            </Div>
            <Div
                style={[
                    Style.w_p100,
                    Style.row,
                    Style.column_center,
                    Style.wrap,
                    Style.m_t_2,
                ]}
            >
                {thumbs}
            </Div>
        </Div>
    );
};

Uploader.defaultProps = {
    multiple: false,
    disabled: false,
    width: "100%",
    height: "100%",
};

export default Uploader;

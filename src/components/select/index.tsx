import React, { FC, useState } from "react";
import { Select } from "antd";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import Style from "style";

type Props = {
    value?: any;
    options: any;
    onChange: any;
    placeholder?: any;
    disabled?: boolean;
    showSearch?: boolean;
    className?: string;
    multiple?: boolean;
    optionFilterProp?: "label" | "children";
    optionLabelProp?: "label" | "value";
};

const SelectCom: FC<Props> = ({
    value = null,
    options,
    onChange,
    placeholder,
    disabled = false,
    showSearch = false,
    className,
    multiple = false,
    optionFilterProp = "children",
    optionLabelProp = "label",
    ...rest
}) => {
    const [opened, setOpened] = useState(false);

    const suffixIcon = (
        <Icon
            name={opened ? "chevron-down" : "chevron-forward"}
            size={Style.f_size_15.fontSize}
            color={Style.f_color_dark_medium.color}
        />
    );

    return (
        <Div
            style={[
                Style.w_p100,
                Style.row,
                Style.column_center,
                Style.position_relative,
                Style.bg_color_light,
                Style.border_round_1,
            ]}
        >
            {disabled === true && (
                <Icon
                    name="disable"
                    size={Style.f_size_15.fontSize}
                    color={Style.f_color_dark.color}
                    style={[Style.m_l_1]}
                />
            )}
            <Select
                className={className}
                allowClear={false}
                autoClearSearchValue={false}
                autoFocus={false}
                bordered={false}
                clearIcon={
                    <Icon
                        name="close-circle"
                        size={Style.f_size_18.fontSize}
                        color={Style.f_color_dark_medium.color}
                    />
                }
                defaultActiveFirstOption={false}
                defaultOpen={true}
                disabled={disabled}
                dropdownMatchSelectWidth={true}
                getPopupContainer={(node) => node.parentNode}
                labelInValue={false}
                optionLabelProp={optionLabelProp}
                optionFilterProp={optionFilterProp}
                mode={multiple ? "multiple" : undefined}
                open={opened}
                onDropdownVisibleChange={() => setOpened(!opened)}
                options={options}
                placeholder={
                    <Text style={[Style.f_size_13, Style.f_weight_500]}>
                        {placeholder}
                    </Text>
                }
                removeIcon={
                    <Icon
                        name="close-circle"
                        size={Style.f_size_15.fontSize}
                        color={Style.f_color_dark_medium.color}
                    />
                }
                showArrow={true}
                showSearch={showSearch}
                size="middle"
                suffixIcon={suffixIcon}
                value={value}
                virtual={true}
                onChange={(value) => {
                    onChange({ value });
                }}
                style={{
                    ...Style.w_p100,
                    ...Style.bg_color_light,
                    ...Style.border_round_1,
                    ...Style.f_size_16,
                    ...Style.f_color_dark_medium,
                }}
                {...rest}
            />
        </Div>
    );
};

export default SelectCom;

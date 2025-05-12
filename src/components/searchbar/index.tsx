import React, { FC, useState } from "react";
import _ from "lodash";

import Div from "components/div";
import Input from "components/input";
import Button from "components/button";

import { trans } from "locales";

import Style from "style";

type Props = {
    handleSearch?: Function;
    onClick?: Function;
    value?: any;
    [key: string]: any;
};

const SearchBar: FC<Props> = ({
    handleSearch,
    onClick,
    value,
    placeholder,
}) => {
    const [searchValue, setSearchValue] = useState(value);

    const handleSearchInput = (event: any) => {
        setSearchValue(event.target.value);
        handleSearch && handleSearch(event.target.value);
    };

    return (
        <Div style={[Style.row, Style.column_center, Style.w_p100]}>
            <Input
                type="text"
                value={searchValue}
                onChangeText={handleSearchInput}
                placeholder={placeholder || trans("searchPlaceholder")}
                style={[Style.flex]}
            />
            <Button
                size="small"
                trans="search"
                onPress={onClick}
                style={[
                    Style.v_center,
                    Style.noborder,
                    Style.m_l_2,
                    Style.p_h_2,
                    Style.bg_color_primary,
                    {
                        height: "30px",
                    },
                ]}
                titleStyle={[
                    Style.f_size_13,
                    Style.f_color_15,
                    Style.f_weight_500,
                ]}
            />
        </Div>
    );
};

export default SearchBar;

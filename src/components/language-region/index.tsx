import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { changeLocale } from "actions/system";

import A from "components/a";
import Div from "components/div";
import Text from "components/text";

import { LANGUAGES, trans } from "locales";

import Style from "style";

const SelectCity = ({ region }) => {
    const cities = [
        {
            id: "600db1bde28f0a4a9bbc0b89",
            slug: "ca-qc-montreal",
        },
    ];

    const list = cities.map((item) => {
        const isSelected = item.slug === _.toLower(region.slug);

        return (
            <A
                key={item.id}
                style={[
                    Style.border_round_1,
                    Style.p_v_1,
                    Style.p_h_2,
                    isSelected ? Style.bg_color_light : Style.bg_color_15,
                ]}
            >
                <Text
                    style={[
                        Style.f_size_13,
                        Style.f_color_dark,
                        Style.f_weight_500,
                        Style.wrap,
                    ]}
                >
                    {trans(`${item.slug}`)}
                </Text>
            </A>
        );
    });

    return <>{list}</>;
};

const SelectLanguage = ({ toggleLanguage, lang }) => {
    const handleToggleLanguage = (language) => {
        toggleLanguage(language);
    };

    return _.map(_.keys(LANGUAGES), (locale, index) => {
        const isSelected = locale === lang;

        return (
            <A
                key={index}
                style={[
                    Style.border_round_1,
                    Style.p_v_1,
                    Style.p_h_2,
                    isSelected ? Style.bg_color_light : Style.bg_color_15,
                ]}
                onPress={() => handleToggleLanguage(locale)}
            >
                <Text
                    style={[
                        Style.f_size_13,
                        Style.f_color_dark,
                        Style.f_weight_500,
                        Style.word_wrap_word,
                    ]}
                >
                    {trans(`locale_${locale}`)}
                </Text>
            </A>
        );
    });
};

const LanguageRegion = ({ locale, change_locale, region }) => {
    return (
        <Div style={[Style.column]}>
            <Text
                style={[
                    Style.f_size_15,
                    Style.f_color_dark_bold,
                    Style.f_weight_500,
                ]}
            >
                {trans("chooseLanguageAndRegion")}
            </Text>
            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.m_t_2,
                    Style.p_t_2,
                    Style.b_t_light_medium,
                    Style.wrap,
                ]}
            >
                <SelectLanguage lang={locale} toggleLanguage={change_locale} />
            </Div>
            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.m_t_2,
                    Style.wrap,
                ]}
            >
                <SelectCity region={region} />
            </Div>
        </Div>
    );
};

const mapStateToProps = (state) => {
    return {
        locale: state.system.locale,
        region: state.region,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        change_locale: (locale) => dispatch(changeLocale(locale)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageRegion);

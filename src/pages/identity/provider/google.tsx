import React, { useEffect, useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { APP_PAGE } from "config/route";
import { LOGIN_REDIRECT_KEY } from "config/constant";

import { signin } from "actions/auth";

import { decrypt } from "helpers/encrypt";
import { getLocalState } from "helpers/storage";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Loading from "components/loading";

import { trans } from "locales";

import Style from "style";

const GoogleProviderPage = (props) => {
    const { provider, query, sign_in, device } = props;

    const [loading, setLoading] = useState(true);

    const goBack = (redirect_url = "") => {
        setTimeout(() => {
            if (!_.isNil(redirect_url) && redirect_url) {
                if (device.isMobile) {
                    window.location.href = redirect_url + "?tab=profile";
                } else {
                    window.location.href = redirect_url;
                }
            } else {
                window.location.href = APP_PAGE;
            }
        }, 500);
    };

    useEffect(() => {
        (async () => {
            const data = await getLocalState(LOGIN_REDIRECT_KEY);
            const redirect_url = decrypt(data);

            if (!_.isEmpty(provider) && _.has(provider, "tokens")) {
                setLoading(false);

                goBack(redirect_url);
            } else if (!_.isEmpty(query) && _.has(query, "access_token")) {
                sign_in(
                    {
                        provider: "google",
                        data: query,
                    },
                    () => goBack(redirect_url)
                );
            } else {
                goBack(redirect_url);
            }
        })();
    }, [provider, query]);

    if (loading) {
        return (
            <Div style={[Style.v_center, Style.h_100]}>
                <Loading />
            </Div>
        );
    }

    return (
        <Div style={[Style.v_center, Style.theme_content, Style.h_100]}>
            <Div style={[Style.p_6, { width: "380px" }]}>
                <Div style={[Style.v_center]}>
                    <Icon
                        name="checkmark-circle"
                        size={Style.f_size_60.fontSize}
                        color={Style.f_color_success.color}
                    />
                    <Div style={[Style.m_v_3]}>
                        <Text
                            style={[
                                Style.f_color_dark_medium,
                                Style.f_size_15,
                                Style.f_weight_500,
                            ]}
                        >
                            {trans("succeeded")}
                        </Text>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export const getServerSideProps = async (ctx) => {
    return {
        props: {
            query: _.get(
                ctx,
                "req.session.grant.response",
                _.get(ctx, "query", {})
            ),
        },
    };
};

const mapStateToProps = (state: any) => {
    return {
        provider: state.profile.provider,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sign_in: (data: object, callback: any) =>
            dispatch(signin(data, callback)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleProviderPage);

import React, { useState } from "react";
import _ from "lodash";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import { trans } from "locales";

import Style from "style";

import { useDeliver } from "deliver/contexts/app";
import { useDrawer } from "deliver/contexts/drawer";

import Identity from "deliver/containers/profile/post";
import ExternalAccount from "deliver/containers/profile/post";

const SettingsCard = (props) => {
    const { title, subtitle, onClick } = props;

    return (
        <A
            style={[
                Style.column,
                Style.row_center,
                Style.column_start,
                Style.bg_color_15,
                Style.shadow_all,
                Style.m_3,
                Style.p_3,
                Style.border_round_2,
            ]}
            onPress={onClick}
        >
            <Text
                style={[
                    Style.f_size_15,
                    Style.f_weight_600,
                    Style.f_color_primary,
                    Style.m_b_2,
                    Style.white_space_normal,
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    Style.f_size_13,
                    Style.f_weight_500,
                    Style.f_color_dark,
                    Style.white_space_normal,
                ]}
            >
                {subtitle}
            </Text>
        </A>
    );
};

const ProfilePage = (props) => {
    const { openDrawer } = useDrawer();
    const { deliver } = useDeliver();

    const progresses = ["home", "identity", "external"];

    const { sub_tab: tab } = props;

    const businessType = _.get(deliver, "entity", "");

    const _progress = _.includes(progresses, tab) ? tab : "home";

    const [progress, changeProgress] = useState(_progress);

    let component = <></>;

    switch (progress) {
        case "identity":
            component = (
                <Identity
                    type="identity"
                    deliver={deliver}
                    changeNav={(progress: string) => changeProgress(progress)}
                />
            );
            break;

        case "external_account":
            component = (
                <ExternalAccount
                    type="external_account"
                    deliver={deliver}
                    changeNav={(progress: string) => changeProgress(progress)}
                />
            );
            break;

        case "home":
            component = (
                <Div
                    style={[
                        Style.column,
                        Style.h_p100,
                        Style.overflow_y_auto,
                        {
                            paddingTop: "60px",
                        },
                    ]}
                >
                    <A
                        style={[Style.top_left, Style.p_3]}
                        onPress={() =>
                            openDrawer({
                                template: "profile_drawer",
                                direction: "left",
                            })
                        }
                    >
                        <Icon
                            name="menu"
                            size={Style.f_size_25.fontSize}
                            color={Style.f_color_dark_medium.color}
                        />
                    </A>
                    {businessType === "individual" && (
                        <SettingsCard
                            title={trans("personalSetting")}
                            subtitle={trans("personalSettingTitle")}
                            onClick={() => changeProgress("identity")}
                        />
                    )}
                    <SettingsCard
                        title={trans("bankAccountSetting")}
                        subtitle={trans("bankAccountSettingTitle")}
                        onClick={() => changeProgress("external_account")}
                    />
                </Div>
            );
            break;
    }

    return <Div style={[Style.column, Style.h_p100]}>{component}</Div>;
};

export default ProfilePage;

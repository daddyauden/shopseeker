import React, { useEffect, useState } from "react";
import _ from "lodash";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Loading from "components/loading";

import { trans } from "locales";

import Style from "style";

const EmailConfirmation = () => {
    const [confirmSuccess, setConfirmSuccess] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setConfirmSuccess(true);
        }, 2000);
    }, []);

    return confirmSuccess ? (
        <Div style={[Style.v_center, Style.h_p100]}>
            <Icon
                name="checkmark-circle"
                size={80}
                color={Style.f_color_success.color}
            />
            <Text style={[Style.f_size_13, Style.f_weight_500, Style.m_v_3]}>
                {trans("signup_confirm_success_content")}
            </Text>
        </Div>
    ) : (
        <Div style={[Style.v_center, Style.h_p100]}>
            <Loading />
        </Div>
    );
};

export default EmailConfirmation;

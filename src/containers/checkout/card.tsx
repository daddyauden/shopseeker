import React, { FC, useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, SetupIntent, StripeError } from "@stripe/stripe-js";

import { Account } from "interfaces/profile";

import Config from "config";

import { addCard } from "actions/profile";

import { addNewCard } from "request/card";
import { createCustomer } from "request/account";

import Lib from "helpers/lib";

import Div from "components/div";
import Text from "components/text";
import Button from "components/button";

import { trans } from "locales";

import Style from "style";

type Props = {
    account: Account;
    add_card: Function;
    [key: string]: any;
};

const CardForm: FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [holderName, setHolderName] = useState<string>("");
    const [payment, setPayment] = useState<{ status: string }>({
        status: "initial",
    });
    const [message, setMessage] = useState<string>("");

    const stripe = useStripe();
    const elements = useElements();

    const { account, add_card, setModalRender } = props;

    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }

        if (!holderName) {
            setMessage("Cardholder is empty");
        }

        setLoading(true);

        const { status, data } = await createCustomer({
            accountId: account.id,
            paymentProvider: Config.PAYMENT_PROVIDER,
        });

        if (status === "failed") {
            setPayment({ status: "error" });
            setMessage(trans("failed"));
            setLoading(false);
            return;
        }

        const cardSetup: {
            setupIntent?: SetupIntent;
            error?: StripeError;
        } = await stripe.confirmCardSetup(data.client_secret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
                billing_details: {
                    name: holderName,
                },
            },
        });

        if (_.has(cardSetup, "error.message")) {
            setPayment({ status: "error" });
            setMessage(_.get(cardSetup, "error.message"));
            setLoading(false);
            return;
        }

        const { status: _status, data: _data } = await addNewCard({
            accountId: account.id,
            paymentProvider: Config.PAYMENT_PROVIDER,
            paymentMethodId: cardSetup.setupIntent!.payment_method,
        });

        if (_status === "failed") {
            setPayment({ status: "error" });
            setMessage(trans("failed"));
            setLoading(false);
            return;
        } else {
            setLoading(false);

            setPayment({ status: "success" });

            setModalRender({ hideModal: true });

            add_card(_data);

            Lib.showToast({
                message: trans("succeeded"),
                type: "success",
            });
        }
    };

    return (
        <Div style={[Style.w_p100]}>
            <Div
                style={[
                    Style.w_p100,
                    Style.row,
                    Style.column_center,
                    Style.row_start,
                    Style.p_2,
                ]}
            >
                <Text style={[Style.f_size_13]}>{message}</Text>
            </Div>

            <input
                type="text"
                placeholder={trans("cardHolder")}
                onChange={({ target }) => setHolderName(target.value)}
                required={true}
                className="StripeCardHolder mb-2 mt-2"
            />

            <CardElement
                className="mt-2 container"
                options={{
                    hidePostalCode: true,
                    iconStyle: "solid",
                    style: {
                        base: {
                            color: "#333",
                            fontWeight: "500",
                            fontFamily:
                                "Roboto, Open Sans, Segoe UI, sans-serif",
                            fontSize: "16px",
                            fontSmoothing: "antialiased",
                            ":-webkit-autofill": {
                                color: "#333",
                            },
                            "::placeholder": {
                                color: "#CCC",
                                fontWeight: "400",
                            },
                            "::selection": {
                                color: "#333",
                            },
                            ":disabled": {
                                color: "#EEE",
                            },
                        },
                    },
                }}
                onChange={(event: any) => {
                    if (event.error) {
                        setPayment({ status: "error" });

                        if (_.has(event, "error.message")) {
                            setMessage(event.error.message);
                        } else {
                            setMessage(trans("error.unknown"));
                        }
                    }
                }}
            />
            {payment.status !== "success" && (
                <Button
                    size="fullwidth"
                    trans="save"
                    disabled={!stripe && holderName !== ""}
                    loading={loading}
                    onPress={handleSubmit}
                    style={[Style.m_t_4]}
                />
            )}
        </Div>
    );
};

const CardModal: FC<Props> = (props) => {
    return (
        <Elements stripe={loadStripe(Config.STRIPE_PUBLISHABLE_KEY as string)}>
            <CardForm {...props} />
        </Elements>
    );
};

const mapStateToProps = (state) => {
    return {
        account: state.profile.account,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add_card: (data) => dispatch(addCard(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);

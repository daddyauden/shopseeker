import _ from "lodash";

import { PROFILE } from "actions/types";

import {
    User,
    Provider,
    Account,
    Contact,
    Card,
    Merchant,
    Deliver,
    Commission,
} from "interfaces/profile";

interface Action {
    type: string;
    payload: any;
}

interface State {
    user: User | {};
    account: Account | {};
    addresses: Contact[];
    cards: Card[];
    provider: Provider | {};
    merchant: Merchant | {};
    deliver: Deliver | {};
    commission: Commission | {};
}

const initialState: State = {
    user: {},
    account: {},
    addresses: [],
    cards: [],
    provider: {},
    merchant: {},
    deliver: {},
    commission: {},
};

function Profile(state = initialState, action: Action) {
    switch (action.type) {
        case PROFILE.INIT_USER:
            return {
                ...state,
                user: action.payload,
            };

        case PROFILE.UPDATE_USER:
            if (action.payload.id) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        ...action.payload,
                    },
                };
            }

        case PROFILE.INIT_PROFILE:
            return {
                ...state,
                merchant: {},
                deliver: {},
                commission: {},
                ...action.payload,
            };

        case PROFILE.INIT_ACCOUNT:
            return {
                ...state,
                merchant: {},
                deliver: {},
                commission: {},
                account: action.payload,
            };

        case PROFILE.UPDATE_ACCOUNT:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    account: {
                        ...state.account,
                        ...action.payload,
                    },
                };
            }

        case PROFILE.INIT_ADDRESSES:
            return {
                ...state,
                addresses: action.payload,
            };

        case PROFILE.ADD_ADDRESS:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    addresses: [action.payload, ...state.addresses],
                };
            }

        case PROFILE.UPDATE_ADDRESS:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    addresses: state.addresses.map((item: Contact) =>
                        item.id === action.payload.id
                            ? { ...item, ...action.payload }
                            : item
                    ),
                };
            }

        case PROFILE.REMOVE_ADDRESS:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    addresses: state.addresses.filter(
                        (item: Contact) => item.id !== action.payload.id
                    ),
                };
            }

        case PROFILE.SET_DEFAULT_ADDRESS:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    addresses: state.addresses.map((item: Contact) =>
                        item.id === action.payload.id
                            ? { ...item, default: true }
                            : { ...item, default: false }
                    ),
                };
            }

        case PROFILE.INIT_CARDS:
            return {
                ...state,
                cards: action.payload,
            };

        case PROFILE.ADD_CARD:
            if (action.payload.id) {
                return {
                    ...state,
                    cards: [action.payload, ...state.cards],
                };
            }

        case PROFILE.REMOVE_CARD:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    cards: state.cards.filter(
                        (item: Card) => item.id !== action.payload.id
                    ),
                };
            }

        case PROFILE.SET_DEFAULT_CARD:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    cards: state.cards.map((item: Card) =>
                        item.id === action.payload.id
                            ? { ...item, default: true }
                            : { ...item, default: false }
                    ),
                };
            }

        case PROFILE.UPDATE_PROVIDER:
            return {
                ...state,
                provider: action.payload,
            };

        case PROFILE.INIT_MERCHANT:
            return {
                ...state,
                account: {},
                addresses: [],
                cards: [],
                provider: {},
                deliver: {},
                commission: {},
                merchant: action.payload,
            };

        case PROFILE.UPDATE_MERCHANT:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    merchant: {
                        ...state.merchant,
                        ...action.payload,
                    },
                };
            }

        case PROFILE.INIT_DELIVER:
            return {
                ...state,
                account: {},
                addresses: [],
                cards: [],
                provider: {},
                merchant: {},
                commission: {},
                deliver: action.payload,
            };

        case PROFILE.UPDATE_DELIVER:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    deliver: {
                        ...state.deliver,
                        ...action.payload,
                    },
                };
            }

        case PROFILE.INIT_COMMISSION:
            return {
                ...state,
                account: {},
                addresses: [],
                cards: [],
                provider: {},
                merchant: {},
                deliver: {},
                commission: action.payload,
            };

        case PROFILE.UPDATE_COMMISSION:
            if (_.get(action, "payload.id")) {
                return {
                    ...state,
                    commission: {
                        ...state.commission,
                        ...action.payload,
                    },
                };
            }

        case PROFILE.RESET_PROFILE:
            return initialState;

        default:
            return state;
    }
}

export default Profile;

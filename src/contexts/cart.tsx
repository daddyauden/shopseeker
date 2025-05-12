import React, { useReducer, useContext, createContext } from "react";
import _ from "lodash";

import { Coupon } from "interfaces/coupon";
import { Item, CartItem } from "interfaces/cart";

import { CART } from "actions/types";

export const cartItemsTotalPrice = (items, coupon: Coupon | null = null) => {
    if (items === null || items.length === 0) return 0;

    const subTotal = items.reduce((total, item) => {
        if (item.salePrice) {
            return total + item.salePrice * item.quantity;
        }

        return total + item.price * item.quantity;
    }, 0);

    let discount = 0;

    if (coupon) {
        if (coupon.type === "amount") {
            discount = Number(coupon.value);
        } else if (coupon.type === "percent") {
            discount = (subTotal * Number(coupon.value)) / 100;
        }
    }

    return subTotal - discount;
};

// increse item to cart, return items
const addItemToCart = (state, action) => {
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
    );

    if (existingCartItemIndex > -1) {
        const newState = [...state.items];
        newState[existingCartItemIndex].quantity += action.payload.quantity;

        return newState;
    }

    return [...state.items, action.payload];
};

// decrese item from cart, return items
const removeItemFromCart = (state, action) => {
    return state.items.reduce((acc, item) => {
        if (item.id === action.payload.id) {
            const newQuantity = item.quantity - action.payload.quantity;

            return newQuantity > 0
                ? [...acc, { ...item, quantity: newQuantity }]
                : [...acc];
        }

        return [...acc, item];
    }, []);
};

// remove item from cart
const clearItemFromCart = (state, action) => {
    return state.items.filter((item) => item.id !== action.payload.id);
};

export const reducer = (state, action) => {
    switch (action.type) {
        case CART.ADD_ITEM:
            return { ...state, items: addItemToCart(state, action) };

        case CART.REMOVE_ITEM:
            return { ...state, items: removeItemFromCart(state, action) };

        case CART.CLEAR_ITEM_FROM_CART:
            return { ...state, items: clearItemFromCart(state, action) };

        case CART.CLEAR_CART:
            return { ...state, items: [] };

        case CART.APPLY_COUPON:
            return { ...state, coupon: action.payload };

        case CART.REMOVE_COUPON:
            return { ...state, coupon: null };

        default:
            return state;
    }
};

const CartContext = createContext({} as any);

interface Props {
    items: CartItem[];
    coupon: Coupon | null;
}

const InitialState = {
    items: [],
    coupon: null,
};

const useCartActions = (initialState: Props = InitialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addItemHandler = (item: Item, quantity = 1) => {
        dispatch({ type: CART.ADD_ITEM, payload: { ...item, quantity } });
    };

    const removeItemHandler = (item: CartItem, quantity = 1) => {
        dispatch({ type: CART.REMOVE_ITEM, payload: { ...item, quantity } });
    };

    const clearItemFromCartHandler = (item: CartItem) => {
        dispatch({ type: CART.CLEAR_ITEM_FROM_CART, payload: item });
    };

    const clearCartHandler = () => {
        dispatch({ type: CART.CLEAR_CART });
    };

    const applyCouponHandler = (coupon: Coupon) => {
        dispatch({ type: CART.APPLY_COUPON, payload: coupon });
    };

    const removeCouponHandler = () => {
        dispatch({ type: CART.REMOVE_COUPON });
    };

    const hasItemHandler = (id) => {
        return state.items?.some((item) => item.id === id);
    };

    const getItemHandler = (id) => {
        return state.items?.find((item) => item.id === id);
    };

    const getCartItemsSubtotalPrice = () =>
        cartItemsTotalPrice(state.items).toFixed(2);

    const getCartItemsDiscount = () => {
        const subTotal = cartItemsTotalPrice(state.items);

        let discount = 0;

        if (state.coupon) {
            if (state.coupon.type === "amount") {
                discount = Number(state.coupon.value);
            } else if (state.coupon.type === "percent") {
                discount = (subTotal * Number(state.coupon.value)) / 100;
            }
        }

        return discount.toFixed(2);
    };

    const getCartItemsTotalPrice = () =>
        cartItemsTotalPrice(state.items, state.coupon).toFixed(2);

    const getCartItemsQuantity = state.items?.reduce(
        (count, item) => count + item.quantity,
        0
    );

    return {
        state,
        addItemHandler,
        removeItemHandler,
        clearItemFromCartHandler,
        clearCartHandler,
        applyCouponHandler,
        removeCouponHandler,
        hasItemHandler,
        getItemHandler,
        getCartItemsSubtotalPrice,
        getCartItemsDiscount,
        getCartItemsTotalPrice,
        getCartItemsQuantity,
    };
};

export const CartProvider = ({ children }) => {
    const {
        state,
        addItemHandler,
        removeItemHandler,
        clearItemFromCartHandler,
        clearCartHandler,
        applyCouponHandler,
        removeCouponHandler,
        hasItemHandler,
        getItemHandler,
        getCartItemsSubtotalPrice,
        getCartItemsDiscount,
        getCartItemsTotalPrice,
        getCartItemsQuantity,
    } = useCartActions();

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                coupon: state.coupon,
                cartItemsCount: state.items?.length,
                cartItemsQuantity: getCartItemsQuantity,
                addItem: addItemHandler,
                removeItem: removeItemHandler,
                clearItemFromCart: clearItemFromCartHandler,
                clearCart: clearCartHandler,
                applyCoupon: applyCouponHandler,
                removeCoupon: removeCouponHandler,
                hasItem: hasItemHandler,
                getItem: getItemHandler,
                getCartItemsSubtotalPrice,
                getCartItemsDiscount,
                getCartItemsTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

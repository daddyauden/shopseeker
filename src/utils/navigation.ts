import _ from "lodash";

const encodeURL = (params) => {
    const pathQuery =
        params && !_.isEmpty(params)
            ? "?" +
              _.join(
                  _.keys(params).map(
                      (k) =>
                          `${encodeURIComponent(k)}=${encodeURIComponent(
                              params[k]
                          )}`
                  ),
                  "&"
              )
            : "";

    return pathQuery;
};

export const getAppUrl = (params: object = {}) => {
    return `${window.location.origin}/${encodeURL(params)}`;
};

export const goToApp = (params: object = {}) => {
    window.location.href = getAppUrl(params);
};

export const getShopUrl = (id, params: object = {}) => {
    return `${window.location.origin}/shop/${id}${encodeURL(params)}`;
};

export const goToShop = (id, params: object = {}) => {
    window.location.href = getShopUrl(id, params);
};

export const goToBack = () => window.history.back();

export const reload = () => window.location.reload();

import _ from "lodash";
import { put, takeLatest, select } from "redux-saga/effects";

import { REGION } from "actions/types";
import { updateRegion } from "actions/region";
import { updateNavRegion, updateNavType } from "actions/nav";

const init_region = function* ({ payload }: { payload: any }) {
    const { region } = yield select((state) => state);

    if (
        !_.isNil(payload) &&
        !_.isEmpty(payload) &&
        !_.isEqual(region, payload.region)
    ) {
        yield put(updateRegion(payload));
    }
};

const update_region = function* ({ payload }: { payload: any }) {
    const { id, slug, title, types } = payload;

    // update navigation region
    yield put(
        updateNavRegion({
            id,
            slug,
            title,
        })
    );

    if (!_.isEmpty(types)) {
        const { id, title } = _.get(types, "0");

        // update navigation type
        yield put(
            updateNavType({
                id,
                title,
            })
        );
    }
};

const root = function* () {
    yield takeLatest(REGION.INIT, init_region);
    yield takeLatest(REGION.UPDATE, update_region);
};

export default root;

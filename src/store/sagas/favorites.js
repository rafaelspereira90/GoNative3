import { call, put } from "redux-saga/effects";
import api from "~/services/api";

import { addFavoritesSuccess } from "~/store/actions/favorites";

export function* addFavoritesRequest(action) {
    const response = yield call(api.get, `/repos/${action.payload.repoName}`);

    yield put(addFavoritesSuccess(response.data));
}

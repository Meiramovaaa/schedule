import {all, put, takeLatest} from "redux-saga/effects"
import * as types from "../actions/types"
import axios from 'axios'
import {BASE_URL} from "../../config/base_url"
function* searhLessons({data}){
    try{
        const activities = yield axios.get(`${BASE_URL}/api/search?${data.key}=${data.value}`).then(res => res.data)
        yield put({type:types.SUCCESS_SEARCH_LESSONS, payload:activities})
    }catch(e){
        yield put({type:types.FAILURE_SEARCH_LESSONS, errors:e})
    }
}

function* autoCompleteFunc({key}){
    try{
        const autoCompleteData = yield axios.get(`${BASE_URL}/api/search/${key}`).then(res => res.data)
        yield put({type:types.SUCCESS_AUTOCOMPLETE, payload:autoCompleteData})
    }catch(e){
        yield put({type:types.FAILURE_AUTOCOMPLETE, errors:e})
    }
}

export function* searchSagas(){
    yield all([
        yield takeLatest(types.SEARCH_LESSONS, searhLessons),
        yield takeLatest(types.AUTOCOMPLETE, autoCompleteFunc),
    ])
}


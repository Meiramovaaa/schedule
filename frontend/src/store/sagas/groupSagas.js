import {all, put, takeLatest} from "redux-saga/effects"
import * as types from "../actions/types"
import axios from 'axios'
import {BASE_URL} from "../../config/base_url"
function* getGroups(){
    try{
        const groups = yield axios.get(`${BASE_URL}/api/groups`).then(res => res.data)
        yield put({type:types.RECIEVED_GET_GROUPS, payload:groups})
    }catch(e){
        yield put({type:types.FAILURE_GET_GROUPS, errors:e})
    }
}

function* getActiveGroups(){
    try{
        const groups = yield axios.get(`${BASE_URL}/api/groups/filter/active`).then(res => res.data)
        yield put({type:types.RECIEVED_ACTIVE_GROUPS, payload:groups})
        
    }catch(e){
        yield put({type:types.FAILURE_ACTIVE_GROUPS, errors:e})
    }
}
function* createGroup(data){
    // console.log(data.data.name);
    try{
        const group = yield axios.post(`${BASE_URL}/api/groups`,
        {
            name:data.data.name,
            start:data.data.start._d,
            end:data.data.end._d
        }).then(res => res.data)
        yield put({type:types.RECIEVED_NEW_GROUP, payload:group})
    }catch(e){
        yield put({type:types.FAILURE_CREATE_GROUP, errors:e})
    }
    
}

function* deleteGroup({id}){
    try{
        yield axios.delete(`${BASE_URL}/api/group/${id}`).then(res => res.data)
        yield put({type:types.SUCCESS_DELETE_GROUP, payload:{id}})
    }catch(e){
        yield put({type:types.FAILURE_DELETE_GROUP, errors:e})
    }
    
}

function* updateGroup({id, name, start, end}){
    try{
        yield axios.put(`${BASE_URL}/api/group`,{id, name, start, end}).then(res => res.data)
        yield put({type:types.SUCCESS_UPDATE_GROUP, payload:{id, name, start, end}})
    }catch(e){
        yield put({type:types.FAILURE_UPDATE_GROUP, errors:e})
    }
}


export function* groupSagas(){
    yield all([
        yield takeLatest(types.GET_GROUPS, getGroups),
        yield takeLatest(types.CREATE_GROUP, createGroup),
        yield takeLatest(types.DELETE_GROUP, deleteGroup),
        yield takeLatest(types.UPDATE_GROUP, updateGroup),
        yield takeLatest(types.GET_ACTIVE_GROUPS, getActiveGroups)
    ])
}
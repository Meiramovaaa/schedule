import {all, put, takeLatest} from "redux-saga/effects"
import * as types from "../actions/types"
import axios from 'axios'
import {BASE_URL} from "../../config/base_url"

function* createLesson({data}){
    try{
        const lessons = yield axios.post(`${BASE_URL}/api/lesson_in_week`,data).then(res => res.data)
        yield put({type:types.RECIEVED_NEW_LESSON_IN_WEEK, payload:lessons})
    }catch(e){
        yield put({type:types.FAILURE_CREATE_LESSON_IN_WEEK, errors:e})
    }
    
}

function* createBusy({data}){
    try{
        const busyTimes = yield axios.post(`${BASE_URL}/api/busy_in_week`,data).then(res => res.data)
        yield put({type:types.RECIEVED_NEW_BUSY_IN_WEEK, payload:busyTimes})
    }catch(e){
        yield put({type:types.FAILURE_CREATE_BUSY_IN_WEEK, errors:e.response.data})
    }
    
}

function* deleteLesson({id}){
    try{
        yield axios.delete(`${BASE_URL}/api/lesson_in_week/${id}`).then(res => res.data)
        yield put({type:types.SUCCESS_DELETE_LESSON_IN_WEEK, payload:{id}})
    }catch(e){
        yield put({type:types.FAILURE_DELETE_LESSON_IN_WEEK, errors:e})
    }
    
}

function* deleteBusy({id}){
    try{
        yield axios.delete(`${BASE_URL}/api/busy_in_week/${id}`).then(res => res.data)
        yield put({type:types.SUCCESS_DELETE_BUSY_IN_WEEK, payload:{id}})
    }catch(e){
        yield put({type:types.FAILURE_DELETE_BUSY_IN_WEEK, errors:e})
    }
    
}

function* updateLesson({id,course_id,group_id,mentor_id,room_id,weekday,time}){
    try{
        const lesson = yield axios.put(`${BASE_URL}/api/lesson_in_week/${id}`,{id,course_id,group_id,mentor_id,room_id,weekday,time}).then(res => res.data)
        yield put({type:types.SUCCESS_UPDATE_LESSON_IN_WEEK, payload:lesson})
    }catch(e){
        yield put({type:types.FAILURE_UPDATE_LESSON_IN_WEEK, errors:e})
    }
}

function* updateBusy({id,mentor_id,text, weekday,time}){
    try{
        const busy = yield axios.put(`${BASE_URL}/api/busy_in_week/${id}`,{id,mentor_id,text, weekday,time}).then(res => res.data)
        yield put({type:types.SUCCESS_UPDATE_BUSY_IN_WEEK, payload:busy})
    }catch(e){
        yield put({type:types.FAILURE_UPDATE_BUSY_IN_WEEK, errors:e})
    }
}

export function* lessonSagas(){
    yield all([
        yield takeLatest(types.CREATE_LESSON_IN_WEEK, createLesson),
        yield takeLatest(types.CREATE_BUSY_IN_WEEK, createBusy),
        yield takeLatest(types.DELETE_LESSON_IN_WEEK, deleteLesson),
        yield takeLatest(types.DELETE_BUSY_IN_WEEK, deleteBusy),
        yield takeLatest(types.UPDATE_LESSON_IN_WEEK, updateLesson),
        yield takeLatest(types.UPDATE_BUSY_IN_WEEK, updateBusy),
    ])
}


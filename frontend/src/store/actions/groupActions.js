import * as types from "./types"

export function getGroups(payload){
    return {payload, type: types.GET_GROUPS}
}

export function createGroup(data){
    return {data, type: types.CREATE_GROUP}
}

export function deleteGroup(id){
    return {type:types.DELETE_GROUP, id}
}

export function updateGroup(data){
    return {type:types.UPDATE_GROUP, ...data}
}

export function getActiveGroups(){
    return {type:types.GET_ACTIVE_GROUPS}
}
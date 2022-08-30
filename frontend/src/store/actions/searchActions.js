import * as types from "./types"

export function searhLessons(data){
    return {type: types.SEARCH_LESSONS, data}
}

export function autoCompleteFunc(key){
    return{type:types.AUTOCOMPLETE, key}
}

// export function createMentor(name){
//     return {type:types.CREATE_MENTOR, name}
// }

// export function deleteMentor(id){
//     return{type:types.DELETE_MENTOR, id}
// }
// export function updateMentor(data){
//     return{type:types.UPDATE_MENTOR, ...data}
// }
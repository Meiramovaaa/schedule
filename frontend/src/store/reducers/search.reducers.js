import * as types from "../actions/types"

const initialState = {
    list:[],
    autoCompleteData:{}
}

export default function searchReducers(state=initialState, action){
    switch(action.type){
        case types.SUCCESS_SEARCH_LESSONS:
            return {...state, list:action.payload}
        case types.FAILURE_SEARCH_LESSONS:
            alert("Ведутся технические работы, попробуйте позже")
            return state
        case types.SUCCESS_AUTOCOMPLETE:
            return {...state, autoCompleteData:action.payload}
        case types.FAILURE_AUTOCOMPLETE:
            alert("Ведутся технические работы, попробуйте позже")
            return state

        case types.RECIEVED_NEW_LESSON_IN_WEEK:
            return {...state, list:[...state.list, ...action.payload]}

        case types.RECIEVED_NEW_BUSY_IN_WEEK:
            return {...state, list:[...state.list, ...action.payload]}

        case types.SUCCESS_DELETE_LESSON_IN_WEEK:
            return{...state, list:removeById(state.list, action.payload.id)}

        case types.SUCCESS_DELETE_BUSY_IN_WEEK:
            return{...state, list:removeById(state.list, action.payload.id)}
        
        case types.UPDATE_LESSON_IN_WEEK:
            return{...state, isLoading:true}

        case types.SUCCESS_UPDATE_LESSON_IN_WEEK:
            return{...state, isLoading:false, list:[...updateLesson(state.list,action.payload)]}

        case types.UPDATE_BUSY_IN_WEEK:
            return{...state, isLoading:true}

        case types.SUCCESS_UPDATE_BUSY_IN_WEEK:
            return{...state, isLoading:false, list:[...updateLesson(state.list,action.payload)]}
            
        default:
            return state
    }
} 

const removeById=(arr, id)=>{
    return arr.filter(item => item.id !== id)
}

function updateLesson(arr,item){
    return arr.map(record => record.id === item.id ? item:record)
}

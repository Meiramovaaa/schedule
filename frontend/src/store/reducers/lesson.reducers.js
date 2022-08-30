import * as types from "../actions/types"

const initialState = {
    isLoading:false,
    errors:null
}

export default function lessonsReducers(state=initialState, action){
    switch(action.type){
        case types.CREATE_LESSON_IN_WEEK:
            return {...state, isLoading:true}

        case types.RECIEVED_NEW_LESSON_IN_WEEK:
            return {...state, isLoading:false}
        
        case types.FAILURE_CREATE_LESSON_IN_WEEK:
            alert(JSON.stringify(action.errors))
            return {...state, isLoading:false, errors:action.errors}

        case types.CREATE_BUSY_IN_WEEK:
            return {...state, isLoading:true}

        case types.RECIEVED_NEW_BUSY_IN_WEEK:
            return {...state, isLoading:false}
        
        case types.FAILURE_CREATE_BUSY_IN_WEEK:
            return {...state, isLoading:false, errors:action.errors}
        
        case types.FAILURE_DELETE_LESSON_IN_WEEK:
            alert("Ведутся технические работы, попробуйте позже")
            return state

        case types.FAILURE_DELETE_BUSY_IN_WEEK:
            alert("Ведутся технические работы, попробуйте позже")
            return state
        case types.FAILURE_UPDATE_LESSON_IN_WEEK:
            alert("Ведутся технические работы, попробуйте позже")
            return state
        case types.FAILURE_UPDATE_BUSY_IN_WEEK:
            alert("Ведутся технические работы, попробуйте позже")
            return state
        default:
            return state
    }
} 

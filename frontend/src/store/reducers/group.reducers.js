import * as types from "../actions/types"

const initialState = {
    isLoading:false,
    groups:[],
    activeGroups:[]
}

export default function groupsReducers(state=initialState, action){
    switch(action.type){
        case types.RECIEVED_GET_GROUPS:
            return {...state, groups:action.payload}
        case types.FAILURE_GET_GROUPS:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, попробуйте позже")
            return state
        case types.CREATE_GROUP:
            return {...state, isLoading:true}

        case types.RECIEVED_NEW_GROUP:
            // alert(JSON.stringify(action.errors))
            return {...state, isLoading:false, groups:[...state.groups, action.payload]}
        
        case types.FAILURE_CREATE_GROUP:
            alert(JSON.stringify(action.errors))
            return {...state, isLoading:false}
        case types.SUCCESS_DELETE_GROUP:
            return{...state, groups:removeById(state.groups, action.payload.id)}
        case types.FAILURE_DELETE_GROUP:
            alert("Ведутся технические работы, попробуйте позже")
            return state
        case types.UPDATE_GROUP:
            return {...state, isLoading:true}
        case types.SUCCESS_UPDATE_GROUP:
            return {...state, isLoading:false, groups: updateGroup(state.groups, action.payload)}
        case types.FAILURE_UPDATE_GROUP:
            alert(JSON.stringify(action.errors))
            return state
        // case types.GET_ACTIVE_GROUPS:
        //     return {...state, isLoading:true}
        case types.RECIEVED_ACTIVE_GROUPS:
            return {...state, activeGroups:action.payload}
        case types.FAILURE_ACTIVE_GROUPS:
            alert("Ведутся технические работы, попробуйте позже")
            return state
        default:
            return state
    }
} 

const removeById=(arr, id)=>{
    return arr.filter(item => item.id !== id)
}

const updateGroup = (arr, item) =>{
    return arr.map(record => record.id === item.id ? item : record)
}
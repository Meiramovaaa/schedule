import {combineReducers} from "redux"
import mentorsReducers from "./mentor.resucers"
import groupsReducers from "./group.reducers"
import searchReducers from "./search.reducers"
import roomsReducers from "./room.reducers"
import coursesReducers from "./course.reducers"
import lessonsReducers from "./lesson.reducers"
export default combineReducers({
    mentorsReducers,
    groupsReducers,
    searchReducers,
    roomsReducers, 
    coursesReducers,
    lessonsReducers
})
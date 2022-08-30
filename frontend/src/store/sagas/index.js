import {all} from "redux-saga/effects"
import {mentorSagas} from "./mentorSagas"
import { groupSagas } from "./groupSagas"
import { searchSagas } from "./searchSagas"
import { coursesSagas } from "./courseSagas"
import { roomSagas } from "./roomSagas"
import {lessonSagas} from "./lessonSagas"
export default function* rootSaga(){
    yield all([
        mentorSagas(),
        groupSagas(),
        searchSagas(),
        coursesSagas(),
        roomSagas(),
        lessonSagas()
    ])
}
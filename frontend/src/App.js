import {Provider} from "react-redux"
import configureStore from "./store";
import "./assets/logo-white.png"
import Main from "./client/pages/main"
import Result from "./client/pages/result";
import { Routes, Route, useLocation} from "react-router-dom";
import Admin from "./admin/index"
import Mentors from "./admin/mentors"
import Groups from "./admin/groups"
import Lessons from "./admin/lessons";
const store = configureStore()

function App() {
  let location = useLocation()
  return (
    <Provider store={store}>
    <div className="page">
      <Routes>
        <Route path="/" element={<Main/>} />

        <Route path="/group/:id" element={<Result key={location.pathname} queryname = "group_id"/>} />
        <Route path="/mentor/:id" element={<Result key={location.pathname}  queryname = "mentor_id"/>} />
        <Route path="/room/:id" element={<Result key={location.pathname}  queryname = "room_id"/>} />
        <Route path="/admin/" element={<Admin/>} > 
              <Route path="mentor" element={<Mentors/>}/>
              <Route path="group" element={<Groups/>}/>
              <Route path="schedule" element={<Lessons/>}/>
        </Route>
      </Routes>
      
    </div>
    </Provider>
  );
}

export default App;

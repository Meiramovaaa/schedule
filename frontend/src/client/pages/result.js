import Calendar from "../components/calendar";
import Search from "../components/search";
import {useEffect, useState} from "react"
import {useParams, useLocation} from "react-router-dom"
import axios from 'axios'
import {BASE_URL} from "../../config/base_url"
import moment from "moment"
function Result({queryname}) {
  const {id} = useParams()
  const[data, setData] = useState([])

  const location = useLocation()
  const getData = (s, e)=>{
    let start = s ? s : moment().clone().startOf('week').add(1, 'days')
    let end = e ? e : moment().clone().endOf('week').add(1, 'days')

    // console.log(start, end)
    axios.get(`${BASE_URL}/api/search?${queryname}=${id}&start=${start}&end=${end}`).then(res=>{
      setData(res.data)
      // console.log(res.data);
    })
  }
  useEffect(getData, [])

  const onChangeWeek = (date) => {
    let weekStart = date.clone().startOf('week').add(1, 'days')
    let weekEnd = date.clone().endOf('week').add(1, 'days')
    // console.log(weekStart, weekEnd);
    getData(weekStart, weekEnd)
  }
  return (
    <div className="result">
      <Search onChangeWeek={onChangeWeek} placeholder="Search by Group, Room, Mentor" flexDirection="row" filterByWeek={true}/>
      <Calendar data={data}/>
    </div>
  );
}

export default Result;

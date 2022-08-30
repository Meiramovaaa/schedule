import LessonInfo from "./lessonInfo"
import BusyInfo from "./busyInfo"
import {time, weekdays} from "../../../utils/calendarInfo"
import Col from "./col"
import Item from "./item"
import TimeColumn from "./time-column"

function Calendar(props) {
    const {data} = props
    
    // let calendar = [(<TimeColumn key={"timecol"}/>)]

    const showItem = (weekday, t)=>{
        // <LessonInfo course="web-dev" group="web133" mentor="Ziya" room="5"/>
        // return (<BusyInfo text="Ziya"/>)

        // <BusyInfo text="Ziya"/>

        let hour = t.split(" ")
        hour = hour[0]
        // console.log(hour);
        let val = data.filter(item => item.time === hour && item.weekday === weekday)
        
        val = val[0]
        // console.log(val);
        
        return val && val.course ? (
          <LessonInfo 
          course={val.course.name} 
          group={val.group.name} 
          mentor={val.mentor.full_name} 
          room={val.room.number}/>) 
          : val && val.text ? (<BusyInfo text={val.text}/>) 
          : (<span></span>)
    }

    let calendar= weekdays.map(weekday=>{
        //show week days
        let showTime = [(<Item key={0}>{weekday}</Item>)]

        // show calendar info
        showTime = showTime.concat(time.map((t, i)=>(
            <Item key={i+1} time={t}>
                {showItem(weekday, t)}
            </Item>
        )))
        return(<Col key={weekday}>{showTime}</Col>)
    })
    
  return (
    <div className="calendar"  >
      {calendar}
    </div>
  );
}

export default Calendar;

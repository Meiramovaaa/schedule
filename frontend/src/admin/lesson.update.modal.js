import React from 'react';
import { Modal, Input , Button, Form, Select} from 'antd';
import moment from 'moment'
import { CloseOutlined} from '@ant-design/icons';
import { useState, useEffect} from 'react';
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import { getRooms } from '../store/actions/roomActions';
import { getCourses } from '../store/actions/courseActions';
import { getMentors } from '../store/actions/mentorAction';
import { getActiveGroups } from '../store/actions/groupActions';
import {weekdays, time} from "../utils/calendarInfo"
import { Tabs } from 'antd';
import {    updateBusy, updateLesson} from '../store/actions/lessonActions';

const { TabPane } = Tabs;
const today = moment();
const { Option } = Select;
function LessonUpdateModal({
    isModalVisible, 
    handleCancel, 
    loading, 
    getActiveGroupsAction, 
    getRoomsAction, 
    getCoursesAction,
    getMentorsAction,
    courses, 
    rooms,
    mentors,
    activeGroups,
    errors,
    updateBusyAction,
    updateLessonAction,
    openTab
}){

  const[course_id, setCourse] = useState("")
  const[mentor_id, setMentor] = useState("")
  const[group_id, setGroup] = useState("")
  const[room_id, setRoom] = useState("")
  const[text, setText] = useState("")
  const[activeTab, setActiveTab]  = useState(1)
  const[lessonInputs, setLessonInputs] = useState([{
    time:"",
    weekday:""
  }])

  const onChangeText = (e) =>{
    setText(e.target.value)
  }
  const onChangeCourse = (value) =>{
    setCourse(value)
  }
  const onChangeMentor = (value) =>{
    setMentor(value)
  }
  const onChangeGroup = (value) =>{
    setGroup(value)
  }
  const onChangeRoom = (value) =>{
    setRoom(value)
  }
  const onChangeWeekday = (index, value)=>{
    const list = [... lessonInputs]
    list[index].weekday = value
    setLessonInputs(list)
  }

  const onChangeTime = (index, value)=>{
    const list = [... lessonInputs]
    list[index].time = value
    setLessonInputs(list)
  }

//   const addLesson = ()=>{
//     setLessonInputs([...lessonInputs, {weekday:"", time:""}])
//   }
  const editLesson = () =>{

  }

  const deleteLesson = (index) =>{
    
    const list = [...lessonInputs]
    list.splice(index, 1)
    setLessonInputs(list)
  }

  const handleOk = () => {
    if(activeTab == 1){
      updateLessonAction({mentor_id, course_id, group_id, room_id, lessonInputs})
    }else{
      updateBusyAction({mentor_id, text, lessonInputs})
    }   
  }

  useEffect(() => {
    getActiveGroupsAction()
    getRoomsAction()
    getCoursesAction()
    getMentorsAction()
},[])

  useEffect(()=>{
    if(!loading && !errors){
      setCourse("")
      setRoom("")
      setMentor("")
      setGroup("")
      setLessonInputs([{
        time:"",
        weekday:""
      }])
      handleCancel();
    }
  }, [loading])

  const onChange = (key) => {
    setActiveTab(key)
  };
  useEffect(() => {
    setActiveTab(openTab)
  }, [openTab])
  console.log(activeTab);
    return(
        <Modal 
        title="???????????????????? ????????????" 
        visible={isModalVisible} 
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              ????????????
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              ??????????????????
            </Button>,
            ,
          ]}>

          <Tabs activeKey={activeTab} onChange={onChange}>
              <TabPane tab="??????????" key="1">
                  <Form.Item 
                    key={100}
                    validateStatus={errors && errors.course_id ? 'errors' : 'success'} 
                    help={errors && errors.course_id ? errors.course_id : ''}>
                      <Select
                        showSearch
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        placeholder="Search to course"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeCourse}
                      >
                        {courses.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                    key={101}
                    validateStatus={errors && errors.group_id ? 'errors' : 'success'} 
                    help={errors && errors.group_id ? errors.group_id : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to group"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeGroup}
                      >
                        {activeGroups.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                    key={102}
                    validateStatus={errors && errors.mentor_id ? 'errors' : 'success'} 
                    help={errors && errors.mentor_id ? errors.mentor_id : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to mentor"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeMentor}
                      >
                        {mentors.map(item => <Option key={item.id} value={item.id}>{item.full_name}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                    key={104}
                    validateStatus={errors && errors.room_id ? 'errors' : 'success'} 
                    help={errors && errors.room_id ? errors.room_id : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to room"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeRoom}
                      >
                        {rooms.map(item => <Option key={item.id} value={item.id}>{item.number}</Option>)}
                      </Select>
                  </Form.Item>
              </TabPane>
              <TabPane tab="?????????????????? ??????????????????????????" key="2">
                  <Form.Item 
                    key={100}
                    validateStatus={errors && errors.mentor_id ? 'errors' : 'success'} 
                    help={errors && errors.mentor_id ? errors.mentor_id : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Select
                        showSearch
                        size="large"
                        placeholder="Search to mentor"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeMentor}
                      >
                        {mentors.map(item => <Option key={item.id} value={item.id}>{item.full_name}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                    key={101}
                    validateStatus={errors && errors.text ? 'errors' : 'success'} 
                    help={errors && errors.text ? errors.text : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Input size="large" placeholder="?????????????? ??????????????????????" onChange={onChangeText} value={text} />
                    </Form.Item>
              </TabPane>
            </Tabs>

              {lessonInputs.map((lessonInput, index) =><div key={index} style={{
                display:"flex",
                justifyContent:"space-between",
                position:"relative"
              }}>
                <Form.Item 
                validateStatus={errors && 
                                errors.lessonInputs && 
                                errors.lessonInputs[index] &&
                                errors.lessonInputs[index].weekday ? 'errors' : 'success'} 
                help={errors && 
                      errors.lessonInputs && 
                      errors.lessonInputs[index] &&
                      errors.lessonInputs[index].weekday ? 'errors' : ''}
                style={{
                      width: "calc(50% - 10px)"
                    }}>
                  <Select
                    showSearch
                    size="large"
                    placeholder="Search to weekdays"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    onChange={(value)=>onChangeWeekday(index, value)}
                  >
                    {weekdays.map((item) => <Option key={item} value={item}>{item}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item 
                validateStatus={errors && 
                  errors.lessonInputs && 
                  errors.lessonInputs[index] &&
                  errors.lessonInputs[index].time ? 'errors' : 'success'} 
                help={errors && 
                      errors.lessonInputs && 
                      errors.lessonInputs[index] &&
                      errors.lessonInputs[index].weekday ? 'errors' : ''}
                style={{
                      width: "calc(50% - 10px)",
                      
                    }}>
                  <Select
                    showSearch
                    
                    size="large"
                    placeholder="Search to time"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    onChange={(value)=>onChangeTime(index, value)}
                  >
                    {time.map((item) =>{ 
                      let t = item.split(" ")
                      t = t[0]
                      return <Option key={t} value={t}>{item}</Option>
                    })}
                  </Select>
                </Form.Item>
                <CloseOutlined 
                  onClick={()=>{deleteLesson(index)}} 
                  style={{
                  color:"#ff0000",
                  position:"absolute",
                  right:"-18px",
                  top:"13px",
                  cursor:"pointer"
                }}/>
          
              </div>)}
            <Button onClick={editLesson}>??????????????????????????</Button>
          </Modal>
    )
}

const mapDispatchToProps = dispatch =>({
  getActiveGroupsAction:bindActionCreators(getActiveGroups, dispatch),
  getRoomsAction:bindActionCreators(getRooms, dispatch),
  getCoursesAction:bindActionCreators(getCourses, dispatch),
  getMentorsAction:bindActionCreators(getMentors, dispatch),
  updateBusyAction:bindActionCreators(updateBusy, dispatch),
updateLessonAction:bindActionCreators(updateLesson, dispatch)
})

const mapStateToProps = state =>({
  loading:state.lessonsReducers.isLoading,
  rooms:state.roomsReducers.rooms,
  errors:state.lessonsReducers.errors,
  courses:state.coursesReducers.courses,
  groups:state.groupsReducers.groups,
  mentors:state.mentorsReducers.mentors,
  activeGroups:state.groupsReducers.activeGroups
})
export default connect(mapStateToProps, mapDispatchToProps)(LessonUpdateModal);
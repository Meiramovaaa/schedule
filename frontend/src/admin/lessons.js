import { Typography, Button ,Table, Space, AutoComplete} from 'antd';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import { useState, useEffect } from 'react';
import LessonModal from './lesson.modal';
import LessonUpdateModal from './lesson.update.modal';
import { deleteLesson, deleteBusy, updateBusy, updateLesson} from '../store/actions/lessonActions';
import { searhLessons, autoCompleteFunc } from '../store/actions/searchActions';
import Input from '../client/components/input';
const { Title } = Typography;

function Lessons(props){
  const[data, setData] = useState({})
  const [search, setSearch] = useState("")
  const [openTab , setOpenTab] = useState("") 
  const onChange = (e) =>{
    setSearch(e.target.value)
    props.autoCompleteFunc(e.target.value)
  }

  
  const deleteFunc = (props, id) =>{
      props.list.forEach(item => {
          if(id == item.id && item.text){
            props.deleteBusyAction(id)
          }else{
              props.deleteLessonAction(id)
          }
      });
  }

  const editFunc = (props, id) =>{
    console.log(props);
    console.log(id);
    if(props.text){
        setOpenTab("2")
        showModal()
    }else{
        setOpenTab("1")
        showModal()
    }
    setData(props)
  }
  
  const columns = [
    {
        title: 'Weekday',
        dataIndex: 'weekday',
        key: 'Weekday',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'Time',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Course',
        dataIndex: 'course',
        key: 'Course',
        render: (item) => <a>{item && item.name}</a>,
    },
    {
        title: 'Group',
        dataIndex: 'group',
        key: 'Group',
        render: (item) => <a>{item && item.name}</a>,
    },
    {
        title: 'Room',
        dataIndex: 'room',
        key: 'Room',
        render: (item) => <a>{item && item.number}</a>,
    },
    {
        title: 'Mentor',
        dataIndex: 'mentor',
        key: 'Mentor',
        render: (item) => <a>{item && item.full_name}</a>,
    },
    {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
            <a onClick={ ()=> editFunc(record, record.id)}>Редактировать </a>
            <a onClick={()=> deleteFunc(props, record.id)}>Удалить</a>
            </Space>
        ),
        align:"right"
    },
  ];
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const showModal = () => {
        setIsModalVisible(true);
    };
    

    const handleCancel = () => {
        setIsModalVisible(false);
        // setEditBusy({})
        // setEditLesson({})
    };

    const onSelectItem = (key, value) =>{
        setSearch('')
        props.autoCompleteFunc("")
        props.searchLessonsAction({key, value})
    }

    return(
        <div>
            <div className='page-header'>
                <Title>Расписание</Title>
                <div className='page-header-actions'>
                    <Input onChange={onChange} style={{marginLeft: 'auto'}} placeholder="Mentor, group, room" value={search} onSelectItem={onSelectItem} data={props.autoCompleteData}/>

                    <Button type="primary" size={"large"} onClick={showModal}>
                        Добавить запись
                    </Button>
                </div>
            </div>
            <Table columns={columns} dataSource={props.list} rowKey={item => item.text ? 'busy-'+item.id : 'lesson-'+item.id}/>

            <LessonModal  isModalVisible={isModalVisible}  handleCancel={handleCancel} data={data} openTab={openTab}/>
            {/* <LessonUpdateModal isModalVisible={isModalVisible}  handleCancel={handleCancel} openTab={openTab}></LessonUpdateModal> */}
        </div>
    );
}

const madDispatchToProps = dispatch =>({
    searchLessonsAction:bindActionCreators(searhLessons, dispatch),
    autoCompleteFunc:bindActionCreators(autoCompleteFunc, dispatch),
    deleteLessonAction:bindActionCreators(deleteLesson, dispatch),
    deleteBusyAction:bindActionCreators(deleteBusy, dispatch),
    
})

const mapStateToProps=(state)=>({
    list:state.searchReducers.list,
    autoCompleteData:state.searchReducers.autoCompleteData
})

export default connect(mapStateToProps,madDispatchToProps)(Lessons) ;

import { Typography, Button ,Table, Space} from 'antd';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import { useState, useEffect } from 'react';
import MentorModal from './mentor.modal';
import { deleteMentor, getMentors } from '../store/actions/mentorAction';

const { Title } = Typography;



function Mentors(props){
  const [editMentor, setEditMentor] = useState(null)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={ ()=> startEditMentor(record)}>Редактировать </a>
          <a onClick={()=>props.deleteMentorAction(record.id)}>Удалить</a>
        </Space>
      ),
      align:"right"
    },
  ];
  const startEditMentor = record =>{
    showModal()
    setEditMentor(record)
  }
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const showModal = () => {
        setIsModalVisible(true);
    };
    // console.log(props.mentors);
    

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditMentor(null)
    };

    useEffect(()=>{
      props.getMentorsAction();
    },[])

    return(
        <div>
            <div className='page-header'>
                <Title>Менторы</Title>
                <Button type="primary" size={"large"} onClick={showModal}>
                    Добавить ментора
                </Button>
            </div>

            <Table columns={columns} dataSource={props.mentors} rowKey={item => item.id}/>

            <MentorModal mentor={editMentor} isModalVisible={isModalVisible}  handleCancel={handleCancel} />
            
        </div>
    );
}

const madDispatchToProps = dispatch =>({
    getMentorsAction:bindActionCreators(getMentors, dispatch),
    deleteMentorAction:bindActionCreators(deleteMentor, dispatch)
})

const mapStateToProps=(state)=>({
    mentors:state.mentorsReducers.mentors
})

export default connect(mapStateToProps,madDispatchToProps)(Mentors) ;

// Load Components -> in useEffect we call Action (type: GET_MENTORS) -> 
// SAGA listen to Action (type: GET_MENTORS) and make request to backend then 
// send recieved data to new Action (type: RECIEVED_GET_MENTORS) 
// and save list of mentors in payload in  action
// Reducer listen to Action (type: RECIEVED_GET_MENTORS) and update state with new list of mentors
// Mentors component listen to store changes by (mapStateToProps) and connect function
// So Mentor component props are updated and component will rerender with new data
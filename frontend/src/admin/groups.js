import { Typography, Button ,Table, Space} from 'antd';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import { useState, useEffect } from 'react';
import GroupModal from './group.modal';
import { deleteGroup, getGroups } from '../store/actions/groupActions';

const { Title } = Typography;



function Groups(props){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editGroup, setEditGroup] = useState(null)
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'End',
        dataIndex: 'end',
        key: 'end',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={()=> startEditGroup(record)}>Редактировать </a>
            <a onClick={()=> props.deleteGroupAction(record.id)}>Удалить</a>
          </Space>
        ),
        align:"right"
      },
    ];
    const startEditGroup = record =>{
      showModal()
      setEditGroup(record)
    }

    const showModal = () => {
        setIsModalVisible(true);
    }
    

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditGroup(null)
    };

    useEffect(()=>{
      props.getGroupsAction();
    },[])
    return(
        <div>
            <div className='page-header'>
                <Title>Группы</Title>
                <Button type="primary" size={"large"} onClick={showModal}>
                    Добавить группу
                </Button>
            </div>

            <Table columns={columns} dataSource={props.groups} rowKey={item => item.id}/>

            <GroupModal group={editGroup} isModalVisible={isModalVisible}  handleCancel={handleCancel} />
            
        </div>
    );
}

const madDispatchToProps = dispatch =>({
    getGroupsAction:bindActionCreators(getGroups, dispatch),
    deleteGroupAction:bindActionCreators(deleteGroup, dispatch)
})

const mapStateToProps=(state)=>({
    groups:state.groupsReducers.groups
})

export default connect(mapStateToProps,madDispatchToProps)(Groups) ;

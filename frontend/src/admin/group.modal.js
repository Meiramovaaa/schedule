import { Modal, Input , Button, DatePicker, Space} from 'antd';
import moment from 'moment'
import {UsergroupAddOutlined, ClockCircleOutlined} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {createGroup, updateGroup} from "../store/actions/groupActions"
const today = moment();
function GroupModal({group, isModalVisible, handleCancel, loading, createGroupAction, updateGroupAction}){

  const[name, setName] = useState("")
  const[start, setStart] = useState(today)
  const[end, setEnd] = useState(today)

  const onChangeDateStart= (date, dateString) => {
    let startData = moment(date._d)
    setStart(startData)
  }

  const onChangeDateEnd= (date, dateString) => {
    let endData = moment(date._d)
    setEnd(endData)
  }

  const onChange = e =>{
    setName(e.target.value)
  }

  const handleOk = () => {
    let data = {
      name, 
      start,
      end
    }
    if(!group){
      createGroupAction(data)
    }else{
      updateGroupAction({id:group.id, name, start: start.toString(), end: end.toString()})
    }
    
  }

  useEffect(()=>{
    if(group){
      setName(group.name)
      setStart(moment(group.start))
      setEnd(moment(group.end))
    }
  }, [group])

  useEffect(()=>{
    if(!loading){
      setName("")
      setStart("")
      setEnd("")
      handleCancel();
    }
  }, [loading])
  
    return(
        <Modal 
        title="Добавление группы" 
        visible={isModalVisible} 
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Сохранить
            </Button>,
            ,
          ]}>
            
            <Input value={name} onChange={onChange} size="large" placeholder="Введите название группы" prefix={<UsergroupAddOutlined />} />
            <Space direction="vertical" >
              <DatePicker value={start} onChange={onChangeDateStart}/>
              
            </Space>
            <Space direction="vertical" >
              <DatePicker value={end} onChange={onChangeDateEnd}/>
            </Space>
        </Modal>
    )
}

const mapDispatchToProps = dispatch =>({
  createGroupAction:bindActionCreators(createGroup, dispatch),
  updateGroupAction:bindActionCreators(updateGroup, dispatch)
})

const mapStateToProps = state =>({
  loading:state.groupsReducers.isLoading
})
export default connect(mapStateToProps, mapDispatchToProps)(GroupModal);
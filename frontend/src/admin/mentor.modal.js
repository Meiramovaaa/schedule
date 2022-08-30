import { Modal, Input , Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {useState, useEffect} from "react"
import { connect } from 'react-redux';
import {createMentor, updateMentor} from "../store/actions/mentorAction"
import {bindActionCreators} from "redux"
function MentorModal({mentor,isModalVisible, handleCancel, loading, createMentorAction, updateMentorAction}){
  const[name, setName] = useState("")
  const handleOk = () => {
    if(!mentor){
      createMentorAction(name)
    }else{
      updateMentorAction({id:mentor.id, name})
    }
  }

  useEffect(()=>{
    if(mentor){
      setName(mentor.full_name)
    }
  }, [mentor])

  useEffect(()=>{
    if(!loading){
      setName("")
      handleCancel();
    }
  }, [loading])
  const onChange = (e) =>{
    setName(e.target.value)
  }
    return(
        <Modal 
        title="Добавление ментора" 
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
          ]}
        >
            <Input size="large" placeholder="Введите имя ментора" onChange={onChange} value={name} prefix={<UserOutlined />} />
        </Modal>
    )
}

const mapDispatchToProps = dispatch =>({
  createMentorAction:bindActionCreators(createMentor, dispatch),
  updateMentorAction:bindActionCreators(updateMentor, dispatch)
})

const mapStateToProps = state =>({
  loading:state.mentorsReducers.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(MentorModal);
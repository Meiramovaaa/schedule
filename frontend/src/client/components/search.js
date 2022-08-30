import Input from "./input";
import logo from "../../assets/logo-white.png"
import {useState, useEffect} from "react"
import { useLocation, Link } from "react-router-dom";
import axios from "axios"
import {BASE_URL} from "../../config/base_url"
import { DatePicker } from 'antd';


function Search(props) {
  let inputProps = {...props}
  delete inputProps.flexDirection
  delete inputProps.filterByWeek
  delete inputProps.onChangeWeek

  const location = useLocation()
  const [search, setSearch] = useState('')
  const[list, setList] = useState({})

  const onChange = e =>{
    setSearch(e.target.value)
    axios.get(`${BASE_URL}/api/search/` + e.target.value).then(res=>{
      setList(res.data)
    }).catch(e=>{
      console.log(e);
    })
  }
  

  return (
    <div className={"search " + props.flexDirection}>
      <Link to="/"><img alt="logo" src={logo} /> </Link> 
      <Input {...inputProps} onChange={onChange} value={search} data={list}/>
      {props.filterByWeek && <DatePicker className="week-picker" onChange={props.onChangeWeek} placeholder="Неделя" picker="week" />}
    </div>
  );
}

export default Search;

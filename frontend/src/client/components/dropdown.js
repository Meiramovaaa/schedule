import {Link} from "react-router-dom"
function DropDown({data, onSelectItem}) {
  const list = []
  
  Object.keys(data).map((key, index)=>{
      
    data[key].length > 0 && list.push(<li key={`header-${index}`} className="dropdown-header">{key}</li>)

    data[key].map((item, i)=>{
    list.push(<li key={`item-${index}=${i}`} className="dropdown-item"> 
        {!onSelectItem ? <Link to={item.name ? `/group/${item.id}` 
        : item.full_name ? `/mentor/${item.id}` 
        : `/room/${item.id}`}>
            {item.name || item.number || item.full_name}
        </Link> :
        <a onClick={()=>onSelectItem(item.name ? 'group_id' : item.number ? 'room_id' : 'mentor_id', item.id)}>{item.name || item.number || item.full_name}</a>
        }
    </li>)
    })

  })
  return (
    <ul className="dropdown-list">
      {list}
    </ul>
  );
}

export default DropDown;

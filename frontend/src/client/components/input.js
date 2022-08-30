import DropDown from "./dropdown";
function Input(props) {
    const inputProps = {...props}
    delete inputProps.data
    delete inputProps.onSelectItem
    return (
      <fieldset className="fieldset">
          <input className="input" {...inputProps}/>
          <DropDown data={props.data} onSelectItem={props.onSelectItem}/>
      </fieldset>
    );
  }
  
  export default Input;
  
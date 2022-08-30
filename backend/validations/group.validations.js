
const createGroupValidator = ({name, start, end}) =>{
    const errors = {}

    if(!name || typeof name !== 'string' || name.trim().length == 0){
        errors.name = "Название группы не может быть пустым"
    }

    if(!start ){
        errors.name = "Старт не может быть пустым"
    }

    if(!end ){
        errors.name = "Дата окончания не может быть пустой"
    }

    return errors
      
}

module.exports = {
    createGroupValidator
}
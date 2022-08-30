const {Group, Sequelize, Lesson_in_Week} = require("../models")
const Op = Sequelize.Op


const createGroups = ({name, start, end})=>{
    return new Promise(async resolve =>{
        const group = await Group.create({
            name,
            start,
            end
        })
        resolve(group)
    })
}

const getGroupsByName = async(query)=>{
    return new Promise(async resolve =>{
        const groups = await Group.findAll({
            where:{
                name:{
                    [Op.like]:`%${query}%`
                }
            }
        }
        )
        resolve(groups)
    })
}


const deleteGroup = async(id)=>{
    return new Promise(async resolve =>{
        await Lesson_in_Week.destroy({where:{group_id:id}})
        await Group.destroy({where:{id}})
        resolve(true)
    })
}

const updateGroup = async({id, name, start, end})=>{
    return new Promise(async resolve =>{
        const group = await Group.update({name, start, end},{where:{id}})
        resolve(group)
    })
}

const getGroups = async(props)=>{
    return new Promise(async resolve =>{
        const groups = await Group.findAll()
        resolve(groups)
    })
    
}

const getActiveGroups = async()=>{
    return new Promise(async resolve =>{
        const groups = await Group.findAll({
            where:{
                end:{
                    [Op.gt]:new Date()
                }
            }
        }
        )
        resolve(groups)
    })
}


module.exports = {
    createGroups,
    getGroupsByName,
    deleteGroup,
    updateGroup,
    getGroups,
    getActiveGroups
}

const {Room, Sequelize} = require("../models")
const Op = Sequelize.Op

const getRooms = async () => {
    return new Promise(async resolve => {
        const rooms = await Room.findAll();
        resolve(rooms)
    })
}

const getRoomsByName = async(query)=>{
    return new Promise(async resolve =>{
        const rooms = await Room.findAll({
            where:{
                number:{
                    [Op.like]:`%${query}%`
                }
            }
        }
        )
        resolve(rooms)
    })
}
module.exports = {
    getRoomsByName,
    getRooms
}

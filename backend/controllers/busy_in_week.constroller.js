const {Busy_in_Week} = require("../models")

const createBusyInWeek = ({text, weekday, time, mentor_id})=>{
    return new Promise(async resolve =>{
        const busyInWeek = await Busy_in_Week.create({
            text,
            weekday,
            time,
            mentor_id
        })
        resolve(busyInWeek)
    })
}

const getBusyInWeek = (mentor_id) =>{
    return new Promise(async resolve =>{
        const busyInWeek = await Busy_in_Week.findAll({
            include: ['mentor'],
            where:{mentor_id}
        }
        )
        resolve(busyInWeek)
    })
}



const updateBusyInWeek = ({id, time, weekday, text, mentor_id}) =>{
    return new Promise(async resolve =>{
        const busy_in_week = await Busy_in_Week.update({time,weekday, text,mentor_id},{where:{id}})
        resolve(busy_in_week)
    })
}

const deleteBusyInWeek = (id)=>{
    return new Promise(async resolve =>{
        await Busy_in_Week.destroy({where:{id}})
        resolve(true)
    })
}

module.exports = {
    createBusyInWeek,
    getBusyInWeek,
    updateBusyInWeek,
    deleteBusyInWeek
}

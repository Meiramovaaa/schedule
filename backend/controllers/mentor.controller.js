
const {Mentor,Lesson_in_Week, Busy_in_Week, Sequelize} = require("../models")
const Op = Sequelize.Op

const getMentors = async(req, res)=>{
    const mentors = await Mentor.findAll()
    res.status(200).send(mentors)
}

const createMentor = async({full_name})=>{
    return new Promise(async resolve =>{
        const mentor = await Mentor.create({
            full_name
        })
        resolve(mentor)
    })
}

const updateMentor = async({id, full_name})=>{
    return new Promise(async resolve =>{
        const mentor = await Mentor.update({full_name},{where:{id}})
        resolve(mentor)
    })
}


const deleteMentor = async(id)=>{
    return new Promise(async resolve =>{
        await Lesson_in_Week.destroy({where:{mentor_id:id}})
        await Busy_in_Week.destroy({where:{mentor_id:id}})
        await Mentor.destroy({where:{id}})
        resolve(true)
    })
}

const getMentorsByName = async(query)=>{
    return new Promise(async resolve =>{
        const mentors = await Mentor.findAll({
            where:{
                full_name:{
                    [Op.like]:`%${query}%`
                }
            }
        }
        )
        resolve(mentors)
    })
}

module.exports = {
    getMentors,
    getMentorsByName,
    createMentor,
    updateMentor,
    deleteMentor
}

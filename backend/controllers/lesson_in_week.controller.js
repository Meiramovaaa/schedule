const {Lesson_in_Week, Group, Sequelize} = require("../models")
const Op = Sequelize.Op
const createLessonInWeek = ({course_id, mentor_id, time, group_id, room_id, weekday})=>{
    return new Promise(async resolve =>{
        const lessonInWeek = await Lesson_in_Week.create({
            course_id, mentor_id, time, group_id, room_id, weekday
        })
        resolve(lessonInWeek)
    })
}

const getLessons = (key, value, start, end) =>{
    return new Promise(async resolve =>{
        if(!start){
            const lessonsInWeek = await Lesson_in_Week.findAll({
                include: ['mentor', 'course', 'room', 'group'],
                where:{[key]:value}
            })
            resolve(lessonsInWeek)
        }else{
            const lessonsInWeek = await Lesson_in_Week.findAll({
                include: ['mentor', 'course', 'room', {
                    model: Group,
                    as:'group'
                }],
                where:{
                    [Op.and]:[
                        {[key]:value},
                        {
                            '$group.start$':{
                                [Op.lte]: new Date(end)
                            }
                        },
                        {
                            '$group.end$':{
                                [Op.gte]: new Date(start)
                            }
                        }
                    ]
                    
                }
            })
            resolve(lessonsInWeek)
        }
    })
}


const updateLesson = (data) =>{
    console.log(data);
    return new Promise(async resolve =>{
        await Lesson_in_Week.update({
            time:data.time, 
            weekday:data.weekday,
            group_id:data.group_id, 
            room_id:data.room_id, 
            course_id:data.course_id, 
            mentor_id:data.mentor_id
        },{where:{id:data.id}})
        const lesson = await Lesson_in_Week.findOne({
            include:['mentor', 'course', 'group', 'room'],
            where:{id: data.id}
        })

        resolve(lesson)
    })
}

const deleteLessonInWeek = (id)=>{
    return new Promise(async resolve =>{
        await Lesson_in_Week.destroy({where:{id}})
        resolve(true)
    })
}

module.exports = {
    createLessonInWeek,
    getLessons,
    updateLesson,
    deleteLessonInWeek
}


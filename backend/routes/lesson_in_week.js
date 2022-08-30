const express = require('express')
const router = express.Router()
const {createLessonInWeekValidator} = require("../validations/lesson_in_week.validations")
const {isEmpty} = require("../utils/is-empty")
const {createLessonInWeek, updateLesson,deleteLessonInWeek} = require("../controllers/lesson_in_week.controller")

router.post("/api/lesson_in_week", async (req, res)=>{
   
    const erros = await createLessonInWeekValidator(req.body)
    if(isEmpty(erros)){
        try{
            let lessonsInWeek = []
            await req.body.lessonInputs.forEach(async item => {
            
                const lesson = await createLessonInWeek({
                    mentor_id:req.body.mentor_id,
                    course_id:req.body.course_id,
                    group_id:req.body.group_id, 
                    room_id:req.body.room_id,
                    weekday:item.weekday,
                    time:item.time
                })
                await lessonsInWeek.push(lesson)
            })
            res.status(200).send(lessonsInWeek)
        }catch(e){
            res.status(500).send(e)
        }
    }else{
        res.status(400).send(erros)
    }
})

router.put("/api/lesson_in_week/:id", async(req, res)=>{
    console.log(req.body);
    try {
        const lesson = await updateLesson(req.body)
        res.status(200).send(lesson)
    } catch(error) {
        res.status(400).send(error)
    }
})


router.delete("/api/lesson_in_week/:id", async(req, res)=>{
    try{
        await deleteLessonInWeek(req.params.id)
        res.status(200).end()
    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router

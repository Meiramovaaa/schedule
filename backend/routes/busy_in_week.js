const express = require('express')
const router = express.Router()
const {createBusyInWeekValidator} = require("../validations/busy_in_week.validations")
const {isEmpty} = require("../utils/is-empty")
const {createBusyInWeek, updateBusyInWeek, deleteBusyInWeek} = require("../controllers/busy_in_week.constroller")


router.post("/api/busy_in_week", async (req, res)=>{

    const erros = await createBusyInWeekValidator(req.body)
    if(isEmpty(erros)){
        try{
            let busyInWeeks = []
            await req.body.lessonInputs.forEach(async item => {
            
                const busy = await createBusyInWeek({
                    mentor_id:req.body.mentor_id,
                    text:req.body.text,
                    weekday:item.weekday,
                    time:item.time
                })
                await busyInWeeks.push(busy)
            })
            res.status(200).send(busyInWeeks)
        }catch(e){
            res.status(500).send(e)
        }
    }else{
        res.status(400).send(erros)
    }
})


router.put("/api/busy_in_week/:id", async(req, res)=>{
    try{
        const busy_in_week = await updateBusyInWeek(req.body)
        res.status(200).send(busy_in_week)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete("/api/busy_in_week/:id", async(req, res)=>{
    try{
        await deleteBusyInWeek(req.params.id)
        res.status(200).end()
    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router

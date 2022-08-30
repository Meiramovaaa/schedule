const express = require('express')
const router = express.Router()
const {getMentors, deleteMentor, updateMentor, createMentor} = require("../controllers/mentor.controller")
const {isAuth} = require("../middlewares/auth.middleware")
router.get("/api/mentors", getMentors)
router.post("/api/mentors",isAuth, async(req, res)=>{
    try{
        const mentor = await createMentor(req.body)
        res.status(200).send(mentor)
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.put("/api/mentors",isAuth, async(req, res)=>{
    try{
        const mentor = await updateMentor(req.body)
        res.status(200).send(mentor)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/api/mentors/:id",isAuth, async(req, res)=>{
    try{
        await deleteMentor(req.params.id)
        res.status(200).end()
    }catch(e){
        res.status(400).send(e)
    }
    
})

module.exports = router

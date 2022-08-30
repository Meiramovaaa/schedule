const express = require('express')
const router = express.Router()
const {createGroups, deleteGroup, updateGroup, getGroups, getActiveGroups} = require("../controllers/group.controller")
const {isEmpty} = require("../utils/is-empty")
const {createGroupValidator} = require("../validations/group.validations")


router.post("/api/groups", async (req, res)=>{
    const erros = createGroupValidator(req.body)
    if(isEmpty(erros)){
        try{
            const group = await createGroups(req.body)
            res.status(200).send(group)
        }catch(e){
            res.status(500).send(e)
        }
    }else{
        res.status(400).send(erros)
    }
})

router.put("/api/group", async(req, res)=>{
    try{
        const group = await updateGroup(req.body)
        res.status(200).send(group)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/api/group/:id", async(req, res)=>{
    try{
        await deleteGroup(req.params.id)
        res.status(200).end()
    }catch(e){
        res.status(400).send(e)
    }
})


router.get("/api/groups", async(req, res)=>{
    try{
        const groups = await getGroups(req.body)
       
        res.status(200).send(groups)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/api/groups/filter/active", async(req, res)=>{
    try{
        const groups = await getActiveGroups()
       
        res.status(200).send(groups)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router

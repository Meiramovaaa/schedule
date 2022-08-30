const {Course} = require("../models")


const getCourses = async()=>{
    return new Promise(async resolve => {
        const courses = await Course.findAll();
        resolve(courses)
    })
}
module.exports = {
    getCourses
}

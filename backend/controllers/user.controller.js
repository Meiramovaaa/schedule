const {User, Sequelize} = require("../models")
const Op = Sequelize.Op
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../config/config")
const createAdmin = async () =>{
    const user = await User.findOne({
        where:{email:"admin@gmail.com"}
    })

    if(!user){
        createUser({email:"admin@gmail.com", password:"decode"})
    }   
}

const createUser = (user) => new Promise( resolve =>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, async function(err, hash) {
            const newUser = await User.create({
                email:user.email,
                password:hash
            })
            resolve(newUser)
        })
    })
})

const login = (user) => new Promise(async resolve =>{
    const isUser = await User.findOne({
        where:{email:user.email}
    })

    if(!isUser){
        return resolve(null)
    }

    bcrypt.compare(user.password, isUser.password, function(err, isMatch) {
        if(!isMatch) return resolve(null)
            const token = jwt.sign({
                exp: (Math.floor(Date.now() / 1000) + (60 * 60))*24 * 365,
                email: isUser.email,
                id:isUser.id
            }, SECRET_KEY);

        resolve(token)
    });

})


const getUserById = (id) => new Promise(async resolve =>{
    const user = await User.findOne({
        where:{id}
    })
    resolve(user)
})

module.exports = {
    createAdmin,
    login,
    getUserById
}

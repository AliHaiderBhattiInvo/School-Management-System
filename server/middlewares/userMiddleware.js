const userModel = require("../models").Users;
// const studentModel = require("../models").Students;
// const teacherModeel = require("../models").Teachers

const validateUser = async (req, res, next) => {
    var user = await userModel.findOne({
        where:{
            token: req.headers.token
        }
    })
    if(user && user.role == "admin") next()
    else res.json("You're not authorized to perform this action!")

}

module.exports = {
    validateUser
}
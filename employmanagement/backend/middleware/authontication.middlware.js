const jwt = require("jsonwebtoken")
require('dotenv').config()
const {UserModel} =  require("../model/user.model")

const authontication = async(req,res,next) => {

    try {
        const token = req.headers.authorization

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

         const {userId} = decodedToken;

         const user =  await UserModel.findOne({_id : userId})
        next();
    }catch(err){
        console.log(err)
        return res.status(401).json({message : "Unauthorised to go further" ,err : err.message})
    }
}

module.exports= { authontication }
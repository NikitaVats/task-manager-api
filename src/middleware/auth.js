const jwt=require('jsonwebtoken')
const User=require('../db/models/user')

const auth = async(req,res,next)=>{
    try{
    const token=req.header('Authorization')
    console.log(token)
    next()
    }catch(e){
        res.status(401).send({error: 'Please authentication'})
    }
}
module.exports = auth
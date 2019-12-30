const express=require('express')
require('./db/mongoose')

const User=require('./db/models/user')
const Task=require('./db/models/task')
const middle=require('./middleware/auth')
const sendWelcomeEmail=require('./emails/account')
const app=express()
const port=process.env.PORT 
app.use(express.json())
app.post('/users',async(req,res)=>{
    try{
    const user = new User(req.body)
    
        await user.save()
        console.log(user)
         sendWelcomeEmail(user.email,user.name)
        res.status(201).send(user)
    }catch(e){
        res.status(400).send()
        
    }
})
 
 app.get('/users',middle,async(req,res)=>{
    try{
    const users= await User.find({})
    res.send(users)
}catch(e){
    res.status(500).send()

}
})


app.patch('/users/:id',async(req,res)=>{
   try{
     const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

     if(!user){
         return res.status(404).send()
     }
     res.send(user)
   }catch(e){
       res.status(400).send(e)


   }
})
app.delete('/users/:id',async(req,res)=>{
   User.findByIdAndDelete(req.params.id).then((users)=>{
       res.send(users)
   }).catch((e)=>{
       res.status(400).send(e)
   })
})

app.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        
        const token=await user.generateAuthToken()
         res.send({user:user.getPublicProfile(),token})
    }catch(e){
        res.status(400).send()
    }

})
const multer=require('multer')
const upload=multer({
    dest:'avatar'
})
app.post('/users/me/avatars',upload.single('avatar'),(req,res)=>{
res.send()
})

const jwt=require('jsonwebtoken')
const myFun=()=>{
const token=jwt.sign({_id:'1abc123'},'thisismynewcourse',{expiresIn:'7 days'})
console.log(token)
const data=jwt.verify(token,'thisismynewcourse')
console.log(data)
}

myFun()
app.listen(port,()=>{
    console.log('Server is up on'+port)
})

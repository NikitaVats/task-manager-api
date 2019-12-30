const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true        
    
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    avatar:{
        type:Buffer
    }}
    )
  userSchema.pre('save',async function(next){
      const user=this
     
          user.password=await bcrypt.hash(user.password,8)
      
      next()
  })
  userSchema.methods.generateAuthToken=async function(){
      const user=this
      const token=jwt.sign({_id:user._id.toString()}, 'thisismynewcourse')
      user.tokens=user.tokens.concat({token})
      await user.save()
       return token
  }
  userSchema.methods.getPublicProfile=async function(){
      const user = this
      const userObject=user.toObject()
      delete userObject.password
      delete userObject.tokens
      return userObject
  }
  userSchema.statics.findByCredentials=async(email,password)=>{
      const user=await User.findOne({email})
      
      if(!user){
          throw new Error('Unable to login')
      }
      const isMatch=await bcrypt.compare(user.password,password)
      console.log(isMatch)
      if(!isMatch){
        throw new Error('Unable to login')
      }
      
      return user
     
  }
    
const User=mongoose.model('User',userSchema)

    module.exports = User



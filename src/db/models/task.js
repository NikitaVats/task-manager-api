const mongoose=require('mongoose')
const validator=require('validator')

const Task=mongoose.model('Task',{
  desrciption:{
      type:String,
     
      trim:true
  },
  completed:{
      type:Boolean,
      default:false
  }
  })
  module.exports=Task
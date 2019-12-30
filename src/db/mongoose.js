const mongoose=require('mongoose')

mongoose.connect(process.env.mongoDbURL,{useNewUrlParser:true,useCreateIndex:true})


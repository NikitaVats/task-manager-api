const bcrypt=require('bcrypt-nodejs')

setTimeout( async ()=>{
    const password="red123"
const hashedPass=await bcrypt.hash(password,8,null,function(){console.log('done')})
console.log(password)
console.log(hashedPass)
}, 1000)


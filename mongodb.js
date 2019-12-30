// CRUD Create Read Update Delete
const mongodb=require('mongodb');

//mongodb returns an object which we use to get connection
const MongoClient = mongodb.MongoClient
const ObjectID=mongodb.ObjectID
const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error)
    {
        return console.log('Unable to connect to database')
    }
    console.log('Connection successful')

const db=client.db(databaseName)
db.collection('users').findOne({name:'Nikita'},(error,user)=>{
    if(error)
    {
        console.log('there is error in findong')
    }
    else{
        console.log(user)
    }
})
})
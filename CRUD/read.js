const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useUnifiedTopology: true},(error,client)=>{
    if(error){
        return console.log('Unable to connect',error)
    }
    const db=client.db(databaseName)
    console.log('Connected')

    db.collection('users').findOne({_id: new ObjectID("601c1654d9925d1ee8dc5edd")},(err,res)=>{
        if(err){
            return console.log('Error finding name',err)
        }
        console.log(res)
    })

    db.collection('users').find({age: {$gt:21}}).toArray((err,res)=>{
        if(err)
        {
            return console.log('Error finding name',err)
        }
        console.log(res)
    })
     db.collection('users').find({age: {$gt:21}}).count((err,res)=>{
        if(err)
        {
            return console.log('Error finding name',err)
        }
        console.log(res)
    })
    db.collection('tasks').findOne({_id: new ObjectID("601c35b87302aba600408444")},(error,res)=>{
        if(error){
            return console.log('Error finding document',error)
        }
        console.log(res)
    })
    db.collection('tasks').find({isCompleted: 0}).toArray((error,res)=>{
        if(error){
            return console.log('Error finding document',error)
        }
        console.log(res)
    })
})
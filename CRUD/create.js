//CRUD CREATE READ UPDATE DELETE
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
// const id=new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{ useUnifiedTopology: true },(error,client)=>{
    if(error){
   return console.log(error, 'Unable to connect to database')
}
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        _id: id,
        name: 'Marco Rues',
        age: 29
    },(error,res)=>{
        if(res){
            console.log(res.ops)
        }
        else{
            console.log(error)
        }
    })
    db.collection('users').insertMany([
        {
        name: 'Dani Alves',
        age: 34
        },
        {
        name: 'Paul Pogba',
        age: 27
        }],
        (error,res)=>{
            if(error){
                return console.log(error,'Error inserting document')
            }
            console.log(res.ops)
        })
    db.collection('tasks').insertMany([
        {
            description: 'Go to grocery shopping',
            isCompleted: 0
        },
        {
            description: 'Go to pawn shop',
            isCompleted: 1
        },
        {
            description: 'Study for Exam',
            isCompleted: 0
        }
    ],
    (error,res)=>{
        if(error){
            return console.log('Unable to update',error)
        }
        console.log(res.ops,'Data inserted successfully')
    })
})
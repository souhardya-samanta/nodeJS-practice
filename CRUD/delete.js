const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect', error)
    }
    const db = client.db(databaseName)
    console.log('Connected')
    db.collection('users').deleteMany(
        { age: { $gt: 21 } }
    ).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
    db.collection('tasks').deleteOne({
        description : "Study for Exam"
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})
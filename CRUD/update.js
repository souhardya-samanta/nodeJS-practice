const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect', error)
    }
    const db = client.db(databaseName)
    console.log('Connected')

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("601c1654d9925d1ee8dc5edd")
    // }, {
    //     $set: {
    //         name: 'David Attenborough',
    //     },
    //     $inc:{
    //         age: -5
    //     }
    // })
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    db.collection('tasks').updateMany({
        isCompleted: 0
    },
    {
        $inc:{
            isCompleted: 1
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})
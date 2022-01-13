//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient
//const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id.id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('unable to connect to database!')
    }

    const db = client.db(databaseName)
    // first argument is object to be inserted
    // second argument is callback function to be called
    // callback function to track error or result info
    
    db.collection('users').insertOne({
        _id: id,
        name: 'Ismail',
        surname: 'Sirma'
    }, (error, result) => {
        if(error){
            return console.log('Unable to insert user')
        }

        console.log(result.insertedId)
    })

    /*
   db.collection('users').insertMany([
       {
        name: 'Ismail',
        surname: 'Sirma'
       },
       {
        name: 'Dan',
        surname: 'Brown'
       }
   ], (error, result) => {
       if(error) {
            return console.log('Unable to insert documents!')
       }

       console.log(result.insertedIds)
   })
   */
})

//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient
//const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('unable to connect to database!')
    }

    const db = client.db(databaseName)

    //////////////////////////////////////////////////////////////////////
    // Update a record aynchronously
    db.collection('users').updateOne({
        _id: new ObjectID("61e057f11c7584926df6610d")
    }, {
        // updated fields only
        $set: {
            name: 'Mike'
        },
        $inc: {
            age: 1
        }
    }).then(() =>{
        console.log(result)
    }).catch(() => {
        console.log(error)
    })

    // update many records
    db.collection('tasks').updateMany({
        completed: false
    }, {
        // updated fields only
        $set: {
            completed: true
        }
    }).then((result) =>{
        console.log(result.modifiedCount)
    }).catch(() => {
        console.log(error)
    })

    /*
    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("61e057f11c7584926df6610d")
    }, {
        $set: {
            name: 'Mike'
        }
    })

    updatePromise.then(() =>{
        console.log(result)
    }).catch(() => {
        console.log(error)
    })
    */
    //////////////////////////////////////////////////////////////////////
    // Delete records by criteria
    db.collection('users').deleteMany({
        name: 'Mike'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
    //////////////////////////////////////////////////////////////////////
    // Search one record by criteria
    db.collection('users').findOne({ name: 'Ismail', surname: 'Sirma' }, (error, user) => {
        if(error){
            return console.log('Unable to fetch')
        }

        console.log(user)
    })

    // search one record by object Id
    db.collection('users').findOne({ _id: new ObjectID("61e057f11c7584926df6610d") }, (error, user) => {
        if(error){
            return console.log('Unable to fetch')
        }

        console.log(user)
    })

    // search with criteria
    db.collection('users').find({ surname: 'Sirma' }).toArray((error, users) => {
        console.log(users)
    })

    // search with criteria and get count of records matching
    db.collection('users').find({ surname: 'Sirma' }).toArray((error, count) => {
        console.log(count)
    })
    //////////////////////////////////////////////////////////////////////
    /*
    // first argument is object to be inserted
    // second argument is callback function to be called
    // callback function to track error or result info
    db.collection('users').insertOne({
        name: 'Ismail',
        surname: 'Sirma'
    }, (error, result) => {
        if(error){
            return console.log('Unable to insert user')
        }

        console.log(result.insertedId)
    })

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

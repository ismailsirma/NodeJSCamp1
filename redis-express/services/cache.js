const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')

const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
client.get = util.promisify(client.get)
const exec = mongoose.Query.prototype.exec

// runs on every single query
mongoose.Query.prototype.exec = async function(){
	
	const key = JSON.stringify(
            Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    )

    // see if we have a value for 'key' in redis, return value
    const cacheValue = await client.get(key)
    if(cacheValue){
        // convert cachedValue in json to a mongoose model
        const doc = JSON.parse(cacheValue)
        return Array.isArray(doc) 
            ? doc.map(d => new this.model(d))
            : new this.model(JSON.parse(doc))
    }

	const result = await exec.apply(this, arguments)
    // if key is not in redis, issue the query and store result in redis
    client.set(key, JSON.stringify(result))

    //console.log(result.validate)
    return result
}
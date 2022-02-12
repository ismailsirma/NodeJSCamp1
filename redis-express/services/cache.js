const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')

const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
client.hget = util.promisify(client.hget)
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function(options={}) {
    this.useCache = true
    //top level hash key a number or a string
    // dont allow empty
    this.hashKey = JSON.stringify(options.key || '')

    return this
}

// runs on every single query
mongoose.Query.prototype.exec = async function(){
	
	const key = JSON.stringify(
            Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    )

    // see if we have a value for 'key' in redis, return value
    // get in info from nested hash
    const cacheValue = await client.hget(this.hashKey, key)
    if(cacheValue){
        // convert cachedValue in json to a mongoose model
        const doc = JSON.parse(cacheValue)
        return Array.isArray(doc) 
            ? doc.map(d => new this.model(d))
            : new this.model(JSON.parse(doc))
    }

	const result = await exec.apply(this, arguments)
    // if key is not in redis, issue the query and store result in redis
    // Expiration time of 10 seconds for future sets
    // setting nested hashkey with hset
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10)

    //console.log(result.validate)
    return result
}

module.exports = {
    clearHash(hashKey){
        // look into redis and delete all data related to a key
        client.del(JSON.stringify(hashKey))
    }
}
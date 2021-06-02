const mongoose = require('mongoose')

class DatabaseConfig {
    connect = (url) => {
        return new Promise((resolve, reject) => {
            mongoose.connect(url,{
                useNewUrlParser : true,
                useUnifiedTopology: true,
                useFindAndModify : false
            }).then(() => {
                console.log('Database connected successfully!')
                resolve()
            }).catch((err) => {
                console.log('Failed to connect Database!', err)
                reject(err)
            })
        })
    }

    disconnect = () => {
        mongoose.connection.close()
    }
}
module.exports = new DatabaseConfig()

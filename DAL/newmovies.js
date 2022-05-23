const jFile = require('jsonfile')

const readFromFile = ()=> {
    return new Promise((resolve, reject) => {
        jFile.readFile(__dirname + "/newmovies.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const writeToFile = (obj)=> {
    return new Promise((resolve, reject) => {
        jFile.writeFile(__dirname + "/newmovies.json", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


module.exports = {readFromFile, writeToFile}
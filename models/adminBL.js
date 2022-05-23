const movAPI = require('../DAL/tvmaze.js')
const usersFile = require('../DAL/users.js')
const movieFile = require('../DAL/newmovies.js')

const delUser = async (username)=> {
    let users = await usersFile.readFromFile();
    return new Promise(async function (resolve, reject){
        let index = users.users.findIndex(user =>user.username == username)
        if (index >= 0) {users.users.splice(index, 1)}
        await usersFile.writeToFile(users)
        resolve (true)
    }) 
}
 
const addUser = async (userToAdd)=> {
    var today = new Date();
    userToAdd.isAdmin = !!userToAdd.isAdmin
    userToAdd.numOfActions = parseInt(userToAdd.numOfActions)
    userToAdd.createdDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let users = await usersFile.readFromFile();
    return new Promise(async function (resolve, reject){
        users.users.push(userToAdd);
        await usersFile.writeToFile(users)
        resolve(true)
    })
}

const findUser = async (username)=> {
    let users = await usersFile.readFromFile();
    return new Promise(async function (resolve, reject)
    {
    let user = users.users.find(user=> user.username == username)
    if (user) resolve(user)
    })
}


const updateUser = async (userToUpdate)=> {
    var today = new Date();
    userToUpdate.isAdmin = !!userToUpdate.isAdmin
    userToUpdate.numOfActions = parseInt(userToUpdate.numOfActions)
    userToUpdate.createdDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let users = await usersFile.readFromFile();
    let user = users.users.findIndex(user=> user.username == userToUpdate.username)
    return new Promise(async function (resolve, reject)
    {
    if (user >= 0) 
    {
        users.users.splice(user, 1)
        users.users.push(userToUpdate)
    }
    await usersFile.writeToFile(users)
    resolve(true)
    })
}

module.exports = { delUser, addUser, findUser, updateUser }
const movAPI = require('../DAL/tvmaze.js')
const usersFile = require('../DAL/users.js')
const movieFile = require('../DAL/newmovies.js')

const clearUserActions = async ()=> { 
    console.log("clearing user credits...")
let usersFileData = await usersFile.readFromFile();
    usersFileData.users.forEach(user=>{ 
        if (!user.isAdmin)
        {user.numOfActions = 10}
        else
        {user.numOfActions = 10000}
    })
    await usersFile.writeToFile(usersFileData)
    return true
}

const logged = (s) => {
    console.log(s)
    if (sessionObj.sessionLogin) return true;
    else return false;
}
   
const auth = async (loginData) => {
    let dataFromUsersFile = await usersFile.readFromFile()
    let match = dataFromUsersFile.users.find(user => { return (user.username == loginData.username && user.password == loginData.password) })
    if (match) 
    { 
        return match; 
    }
    else return false
}

const UpdateActionsLeft = async (dataFromSession) =>
{
    //any time this function is called it checks if the user has actions left
    // and updates the users file with -1. returns false is no actions left
    // or returns the number of actions left.
    let dataFromUsersFile = await usersFile.readFromFile()
    let index = dataFromUsersFile.users.findIndex(user => { return (user.username == dataFromSession) })
    if (index >= 0)
    { 
        if(dataFromUsersFile.users[index]["numOfActions"] >= 0)
        {dataFromUsersFile.users[index].numOfActions -= 1;}
        await usersFile.writeToFile(dataFromUsersFile);
        return dataFromUsersFile.users[index].numOfActions
    }
    else return false;
}

const actionsLeft = async (dataFromSession) =>
{
    //displays the actions left for the user
    let dataFromUsersFile = await usersFile.readFromFile()
    let index = dataFromUsersFile.users.findIndex(user => { return (user.username == dataFromSession) })
    if (index>=0)
    { 
        return dataFromUsersFile.users[index].numOfActions
    }
}
module.exports = { auth, logged, UpdateActionsLeft, actionsLeft, clearUserActions }
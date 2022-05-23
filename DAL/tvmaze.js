const axios = require('axios');

const getAllData = ()=> {
    return axios.get('https://api.tvmaze.com/shows')
}

const getOneData = (id)=> {    
    return axios.get('https://api.tvmaze.com/shows/' + id)
}

module.exports = {getAllData, getOneData}
const movAPI = require('../DAL/tvmaze.js')
const usersFile = require('../DAL/users.js')
const movieFile = require('../DAL/newmovies.js')

const searchTitle = async (searchParams) => 
{
    let dataFromAPI = await movAPI.getAllData()
    let dataFromFile = await movieFile.readFromFile()
    dataFromFile = dataFromFile.newmovies.map(mov=>{return {"id": mov.id, "name" : mov.name, "genres": mov.genres.toString(), "language" : mov.language}})
    dataFromAPI = dataFromAPI.data.map(mov=>{return {"id": mov.id, "name" : mov.name, "genres": mov.genres.toString(), "language" : mov.language, "image":mov.image.medium}})

    let obj = {};
    if (searchParams.name) obj.name = searchParams.name.trim();
    if (searchParams.genres) 
    { 
        obj.genres = searchParams.genres;
        var apiSimilar = dataFromAPI.filter( mov=> 
            mov["genres"].toLowerCase().includes(obj["genres"].toLowerCase()) 
            )
    }
    if (searchParams.language) obj.language = searchParams.language;

    let keys = Object.keys(obj);

    if (keys.length == 1)
    {   
        var apiRes = dataFromAPI.filter( mov=> 
        mov[keys[0]].toLowerCase().includes(obj[keys[0]].toLowerCase()) 
        )

        var jFileRes = dataFromFile.filter( mov=>
            {
                if (mov[keys[0]])
                {
                    console.log("im in the if of the jFileRes")
                    return mov[keys[0]].toLowerCase().includes(obj[keys[0]].toLowerCase()) 
                }
                
            } 
            )
    }

    if (keys.length == 2)
    {
        var apiRes = dataFromAPI.filter( mov=> 
            mov[keys[0]].toLowerCase().includes(obj[keys[0]].toLowerCase())
            && mov[keys[1]].toLowerCase().includes(obj[keys[1]].toLowerCase())
        )

        var jFileRes = dataFromFile.filter( mov=> 
            {
                if (mov[keys[0]] && mov[keys[1]])
                {
                    return mov[keys[0]].toLowerCase().includes(obj[keys[0]].toLowerCase()) && mov[keys[1]].toLowerCase().includes(obj[keys[1]].toLowerCase())
                }
                
            } 
            )
    }

    if (keys.length == 3)
    {
        var apiRes = dataFromAPI.filter( mov=> 
            mov[keys[0]].toLowerCase().includes(obj[keys[0]].toLowerCase())
            && mov[keys[1]].toLowerCase().includes(obj[keys[1]].toLowerCase()) && mov[keys[2]].toLowerCase().includes(obj[keys[2]].toLowerCase()))

            var jFileRes = dataFromFile.filter( mov=> 
                {
                    if (mov[keys[0]] && mov[keys[1]] && mov[keys[2]])
                    {return mov[keys[0]].toLowerCase().includes(obj[keys[0]].toLowerCase()) && mov[keys[1]].toLowerCase().includes(obj[keys[1]].toLowerCase()) && mov[keys[2]].toLowerCase().includes(obj[keys[2]].toLowerCase())}
                } 
                )
        }
    console.log("the keys:" + " " + keys);
    console.log("---------------------------")
    console.log(obj)
    console.log("---------------------------")
    console.log(dataFromFile)
    console.log("---------------------------")
    console.log(apiRes)
    console.log("---------------------------")
    console.log(jFileRes)
    console.log("---------------------------")
    console.log(apiSimilar)
    console.log("---------------------------")
    let allRes = [];
    apiRes.forEach(obj=> allRes.push(obj))
    jFileRes.forEach(obj=> allRes.push(obj))
    let results = { "allRes" : allRes,
                    "sameGenre" : apiSimilar }
    console.log(results)
    console.log("---------------------------")
        return results;

}

const addTitle = async (titleData) => 
{
    let moviesData = await movieFile.readFromFile()
    let exists = moviesData.newmovies.find(x=>x.name == titleData.name)
    if (!exists)
    {
        titleData.id = moviesData.newmovies[moviesData.newmovies.length -1].id + 1;
        moviesData.newmovies.push(titleData)
        movieFile.writeToFile(moviesData)
    }
    else {
        return false
    }
    return true
}

const getOneFromFile = async (id)=>
{
    let moviesData = await movieFile.readFromFile()
    return moviesData.newmovies.find(x=>x.id == id)
}
module.exports = { addTitle, searchTitle, getOneFromFile }
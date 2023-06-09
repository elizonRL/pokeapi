let teamsDatabase = {};

const cleanUpTeam = () =>{
    for(user in teamsDatabase){
        teamsDatabase[user] = [];
    }
}
const bootstrapTeam = (userId) =>{
    teamsDatabase[userId] = [];
}

const getTeamOfUser = (userId)=>{
    return teamsDatabase[userId];
}
const addPokemons = (userId, pokemon)=>{
    teamsDatabase[userId].push(pokemon);
}

const setTeam = (userId, team)=>{
    teamsDatabase[userId]= team;
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemons = addPokemons ;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
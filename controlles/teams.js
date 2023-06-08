const teamsDatabase = {};

const bootstrapTeam = (userId) =>{
    teamsDatabase[userId] = [{name:'Charizard'},{name: 'Blastoise'}];
}

const getTeamOfUser = (userId)=>{
    return teamsDatabase[userId];
}
const addPokemons = (userId, pokemonNAme)=>{
    teamsDatabase[userId].push({name: pokemonNAme});
}

const setTeam = (userId, team)=>{
    teamsDatabase[userId]= team;
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemons = addPokemons ;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
let teamsDatabase = {};
const mongoose = require('mongoose');
const teamsModel = mongoose.model('teamsModel', {userId: String, team: [] });
const cleanUpTeam = () =>{
    return new Promise((resolve, reject)=>{

        for(user in teamsDatabase){
            teamsDatabase[user] = [];
        }
        resolve();
    })
    
}
const bootstrapTeam = (userId) =>{
    return new Promise((resolve , reject)=>{
        let newTeam = new teamsModel({userId: userId, team: []});
        newTeam.save();
        teamsDatabase[userId] = [];
        resolve();
    })
   
}

const getTeamOfUser = (userId)=>{
    return new Promise((resolve, reject)=>{
        resolve(teamsDatabase[userId]);
    });

}

const addPokemon = (userId, pokemon)=>{
    return new Promise((resolve, reject) => {
        if(teamsDatabase[userId].length === 6){
            reject();
        }else{
            teamsDatabase[userId].push(pokemon);
            resolve();
        }
    });
}

const deletePokemonAt = (userId , index)=>{
    if(teamsDatabase[userId][index]){
        teamsDatabase[userId].splice(index, 1);
    }
}

const setTeam = (userId, team)=>{
    teamsDatabase[userId]= team;
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon ;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemonAt = deletePokemonAt;
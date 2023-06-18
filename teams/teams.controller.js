
const mongoose = require('mongoose');
const teamsModel = mongoose.model('teamsModel', {userId: String, team: [] });
const {to} = require('../tools/to');


const cleanUpTeam = () =>{
    return new Promise(async(resolve, reject)=>{
        await teamsModel.deleteMany({}).exec();
        resolve();
    })
    
}
const bootstrapTeam = (userId) =>{
    return new Promise(async(resolve , reject)=>{
        let newTeam = new teamsModel({userId: userId, team: []});
        await newTeam.save();
        
        resolve();
    })
}

const getTeamOfUser = (userId)=>{
    return new Promise(async (resolve, reject) => {
        let[err, dbTeam] = await to(teamsModel.findOne({userId: userId}).exec());

        if(err){
           return reject(err);
        }
        resolve(dbTeam.team);
    });
}

const addPokemon = (userId, pokemon)=>{
    return new Promise(async (resolve, reject) => {
        let[err, dbTeam] = await to(teamsModel.findOne({userId: userId}).exec());
    
        if(err){
          return reject(err);
        }
        if(dbTeam.team.length === 6){
            reject();
        }else{
           dbTeam.team.push(pokemon);
           await dbTeam.save();
            resolve();
        }
    });
}

const deletePokemonAt = (userId , index)=>{
    return new Promise( async (resolve, reject) =>{
        let[err,dbTeam] = await to(teamsModel.findOne({userId: userId}).exec());

        if(err || !dbTeam){
            return reject(err);
        }
    
        if(dbTeam.team[index]){
            dbTeam.team.splice(index, 1);
        }
        await dbTeam.save();
        resolve();
    })
}

const setTeam = (userId, team)=>{
    return new Promise(async (resolve, reject) => {
        let [err, dbTeam] = await to(teamsModel.findOne({userId: userId}).exec());
        if (err || !dbTeam) {
            return reject(err);
        }
        dbTeam.team = team
        await dbTeam.save();
        resolve();
    })
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon ;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemonAt = deletePokemonAt;
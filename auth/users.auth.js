const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
let usersDatabase = {};

const cleanUpUser = ()=>{
    usersDatabase = {};
}
const registerUser = (userName, password)=>{
    //guarda en la base de datos nustro usuario
    let hashedPwd = crypto.hashPasswordSync(password);
    let userId = uuid.v4;
    usersDatabase[userId]={
        userName: userName, 
        password:hashedPwd
    }
    teams.bootstrapTeam(userId);
}

const getUser = (userId) =>{
    return usersDatabase[userId];
}

const getUserIdFromUserName = (userName)=>{
    for(let user in usersDatabase){
        if(usersDatabase[user].userName==userName){
            let userData = usersDatabase[user];
            userData.userId = user;
            return userData;
        }
    }
}

const checkUserCredentials = (userName, password, done)=>{
    //comprueba los credenciales de nuetros usuarios
    let user = getUserIdFromUserName(userName);
    if(user){
        console.log(user);
        crypto.comparePassword(password, user.password, done);
    }else{
        done('missing user');
    }
};

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.cleanUpUser = cleanUpUser;
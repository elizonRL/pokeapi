const uuid = require('uuid');
const crypto = require('../crypto.js');

const usersDatabase = {};

const registerUser = (userName, password)=>{
    //guarda en la base de datos nustro usuario
    let hashedPwd = Crypto.hashPasswordSync(password)
    usersDatabase[uuid.v4()]={
        userName: userName, 
        password:hashedPwd
    }
    
};

const getUserIdFromUserName = (userName)=>{
    for(let user in usersDatabase){
        if(usersDatabase[user].userName==userName){
            return usersDatabase[user];
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

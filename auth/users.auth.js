const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
const mongoose = require('mongoose');
const userModel = mongoose.model('userModel', { userName: String, password: String, userId: String });

let usersDatabase = {};
const cleanUpUser = ()=>{
    usersDatabase = {};
}
const registerUser = (userName, password)=>{
    //guarda en la base de datos nustro usuario
    return new Promise(async(resolve, reject)=>{
        let hashedPwd = crypto.hashPasswordSync(password);
        let userId = uuid.v4;
        let newUser = new userModel({
            userId: userId, 
            userName: userName, 
            password:hashedPwd
        });
        await newUser.save();
        await teams.bootstrapTeam(userId);
        resolve();
    });
    
}

registerUser('elizon', '1234');

const getUser = (userId) =>{
    return new Promise((resolve, reject)=>{
        
        resolve(usersDatabase[userId]);
    })
}

const getUserIdFromUserName = (userName)=>{
    return new Promise ((resolve, reject)=>{
        for(let user in usersDatabase){
            if(usersDatabase[user].userName==userName){
                let userData = usersDatabase[user];
                userData.userId = user;
                resolve(userData);
            }
        }
    })
}

const checkUserCredentials = (userName, password)=>{

    return new Promise(async (resolve, reject)=>{
         //comprueba los credenciales de nuetros usuarios
        let user = await getUserIdFromUserName(userName);
        if(user){
            console.log(user);
            crypto.comparePassword(password, user.password, (err, result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        }else{
           reject('missing user');
        }
    });

}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.cleanUpUser = cleanUpUser;
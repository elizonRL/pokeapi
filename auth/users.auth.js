const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
const mongoose = require('mongoose');
const {to} = require('../tools/to');
const userModel = mongoose.model('userModel', { userName: String, password: String, userId: String });


const cleanUpUser = ()=>{
    return new Promise(async(resolve, reject)=>{

        await userModel.deleteMany({}).exec();
        resolve();
    })
    
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
    return new Promise(async (resolve, reject)=>{
        let [err, result] = await to(userModel.findOne({userId: userId}).exec());
        if(err){
            reject(err);
        } 
        resolve(result);
    })
}

const getUserIdFromUserName = (userName)=>{
    return new Promise (async (resolve, reject)=>{
        let [err, result] = await to(userModel.findOne({userName: userName}).exec());
        if(err){
            reject(err);
        } 
        resolve(result);
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
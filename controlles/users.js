const uuid = require('uuid');
const crypto = require('./crypto.js');

const usersDatabase = {
    "0001":{
        "password":"",
        "salt":"",
        "userName":""
    }
};

const registerUser = (userName, password)=>{
    //guarda en la base de datos nustro usuario
    crypto.hashPassword(password, (err, result)=>{
        usersDatabase[uuid.v4]={
            userName: userName, 
            password:result
        }
    });
   
};

const checkUserCredentials = (userId, password)=>{
    //comprueba los credenciales de nuetros usuarios
    let user = usersDatabase[userId];
    crypto.comparePassword(password, user.password, done);
};


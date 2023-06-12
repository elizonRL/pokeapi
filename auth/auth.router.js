const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//constroles
const usersController = require('./users.auth');
usersController.registerUser('elizon', '1234');

router.route('/')
    .get((req, res)=>{
        res.send('Auth Router');
    })

router.route('/login')
    .post((req, res)=>{
        if(!req.body){
            return res.status(400).json({message: 'missing data'});
        }else if(!req.body.user || !req.body.password){
            return res.status(400).json({message: 'missing data'});
        }
        usersController.checkUserCredentials(req.body.user, req.body.password, (err, result)=>{
            if(err || !result){
                return res.status(401).json({message: 'Invalid Credentials'});
            }
            let user = usersController.getUserIdFromUserName(req.body.user);
            const token = jwt.sign({userId: user.userId}, 'secretPassword');
            res.status(200).json({
                token: token
            });
        });
    
    });

    exports.router = router;
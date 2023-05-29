const express = require('express');
const app = express(); 
const passport = require('passport');
const jwt = require('jsonwebtoken')
const usersControlles = require('./controlles/users');
require('./auth')(passport);
const port = 3000;
app.get('/', (req, res) =>{
     res.status(200).send('hello wordl!');
});

app.post('/team/pokemons', (req, res) =>{

    res.status(200).send('hello wordl!');
});

app.get('/team', passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.status(200).send('hello wordl!');
});

app.post('/login', (req, res)=>{
    usersControlles.checkUserCredentials(req.body.user, req.body.password, (err, result)=>{
        if(!result){
            return res.status(401).json({message: 'Invalid Credentials'});
        }
        const token = jwt.sign({userId: req.body.user});
        res.status(200).json({
            token: token
        });
    });
    
});

app.delete('/team/pokemons/:pokeid', ()=>{
    res.status(200).send('hello wordl!');
});

app.put('/team', (req, res) => {
    res.status(200).send('hello wordl!');
});
app.listen(port, ()=>{
    console.log("Server Started at port 3000");
});

exports.app = app;
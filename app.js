const express = require('express');
const bodyParse = require('body-parser');

const port = 3000;

const authRoutes = require('./routers/auth').router;
const teamsRoutes = require('./routers/teams').router;

const app = express();
app.use(bodyParse.json());

app.get('/', (req, res) =>{


     res.status(200).send('hello wordl!');
});

app.use('/auth', authRoutes)
app.use('/teams', teamsRoutes)

app.listen(port, ()=>{
    console.log("Server Started at port 3000");
});

exports.app = app;
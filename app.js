const express = require('express');
const middlewares = require('./middlewares');

const port = 3000;

const authRoutes = require('./auth/auth.router').router;
const teamsRoutes = require('./teams/teams.router').router;

const app = express();
middlewares.setupMiddlewares(app);

app.get('/', (req, res) =>{
     res.status(200).send('hello wordl!');
});

app.use('/auth', authRoutes)
app.use('/teams', teamsRoutes)

app.listen(port, ()=>{
    console.log("Server Started at port 3000");
});

exports.app = app;
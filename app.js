const express = require('express');
const app = express(); 
const port = 3000;
app.get('/', (req, res) =>{
     res.status(200).send('hello wordl!');
});

app.post('/team/pokemons', (req, res) =>{

    res.status(200).send('hello wordl!');
});

app.get('/team', (req, res)=>{
    res.status(200).send('hello wordl!');
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
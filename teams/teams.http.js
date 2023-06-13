const axios = require('axios');

const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.auth');
const {to} = require('../tools/to');

const getTeamFromUser = async (req, res)=>{
    let user = getUser(req.user.userId);
    let team = await teamsController.getTeamOfUser(req.user.userId);
        res.status(200).json({
            trainer: user.userName,
            team: team
        });
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team)
    res.status(200).send();
}

const addPokemonstoTeam = async (req, res) =>{
    let pokemonNAme = req.body.name;

    let [pokeApiErr, pokeApiResponse] = await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNAme.toLowerCase()}`));
    if(pokeApiErr){
        return res.status(400).json({message: pokeApiErr}); 
    }
    let pokemon = { 
        name: pokemonNAme,
        pokedexNumber: pokeApiResponse.data.id
    }
    let [errorAdd, response] = await to(teamsController.addPokemons(req.user.userId, pokemon));
       
    if(errorAdd){
        return res.status(400).json({message: 'you have already 6 pokemon'}); 
    }
    res.status(201).json(pokemon);  
    
}

const deletePokemonFromTeam = (req , res)=>{
    teamsController.deletePokemonAt(req.user.userId, req.params.pokeid);
    res.status(200).send();
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonstoTeam = addPokemonstoTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;
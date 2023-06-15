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

    let pokemonName = req.body.name;
    let [pokeApiError, pokeApiResponse] = 
        await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`))
    if (pokeApiError) {
        return res.status(400).json({message: pokeApiError});
    }
    
    let pokemon = {
        name: pokemonName, 
        pokedexNumber: pokeApiResponse.data.id
    }

    let [errorAdd , response]=  await to (teamsController.addPokemon(req.user.userId, pokemon));
    
   if (errorAdd !== null) {
      return res.status(400).json({message: 'You have already 6 pokemons'});
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
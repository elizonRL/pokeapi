const axios = require('axios');

const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.auth');

const getTeamFromUser = (req, res)=>{
    let user = getUser(req.user.userId);
        res.status(200).json({
            trainer: user.userName,
            team: teamsController.getTeamOfUser(req.user.userId)
        });
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team)
    res.status(200).send();
}

const addPokemonstoTeam = (req, res) =>{
    let pokemonNAme = req.body.name;
    console.log('calling pokeapi');
axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNAme.toLowerCase()}`)
    .then(function (response) {
        // handle success
        console.log(response.data.id);
        let pokemon = { 
            name: pokemonNAme,
            pokedexNumber: response.data.id
        }
        teamsController.addPokemons(req.user.userId, pokemon)
        res.status(201).json(pokemon);
    })
    .catch(function (error) {
        // handle error
        res.status(400).json({message: error})
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

}
const deletePokemonFromTeam = (req , res)=>{
    teamsController.deletePokemonAt(req.user.userId, req.params.pokeid);
    res.status(200).send();
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonstoTeam = addPokemonstoTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;
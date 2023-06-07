const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res)=>{
        res.status(200).send('hello wordl!');
    })
    .put((req, res) => {
        res.status(200).send('hello wordl!');
    })
router.route('/pokemons')
    .post((req, res) =>{

        res.status(200).send('hello wordl!');
    })
router.route('/pokemons/:pokeid')
    .delete(()=>{
        res.status(200).send('hello wordl!');
    })

exports.router = router;    
const express = require('express');
const router = express.Router();

const authHttp = require('./auth.http');

router.route('/')
    .get((req, res)=>{
        res.send('Auth Router');
    })

router.route('/login')
    .post(authHttp.loginUser);

    exports.router = router;
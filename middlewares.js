const authMiddleware = require('./tools/auth-middleware');
const bodyParse = require('body-parser');

const setupMiddlewares = (app)=>{
    app.use(bodyParse.json());
    authMiddleware.init();
    app.use(authMiddleware.protectWithJwt);
}

exports.setupMiddlewares = setupMiddlewares;
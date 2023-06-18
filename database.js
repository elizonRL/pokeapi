const mongoose = require('mongoose');

let password = 'admin';
let databaseName = 'db'
if(process.env.Node_ENV === 'test'){
    databaseName = 'dbtest'
}

mongoose.connect(`mongodb+srv://admin:${password}@atlascluster.0lphljo.mongodb.net/${databaseName}?retryWrites=true&w=majority`);

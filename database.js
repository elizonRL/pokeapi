const mongoose = require('mongoose');

let password = 'admin';

mongoose.connect(`mongodb+srv://admin:${password}@atlascluster.0lphljo.mongodb.net/?retryWrites=true&w=majority`);

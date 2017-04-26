var mongoose = require('mongoose');

mongoose.Promise = global.Promise; 
mongoose.connnect('mongodb://localhost:27017/TodoApp');


const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var id = '5902592e52e712a85d89114b'

// var id = '590b50727a42b01eac9633ae';

// if(!ObjectID.isValid(id)) {
//     console.log('ID is not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('todos', todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo', todo)
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
//     console.log('todo by id ', todo)
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('user not found');
    }
    console.log('User by id ', user)
}).catch((e) => console.log(e));
var mongoose = require('mongoose');

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text: 'Get nintendo Gift card'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo')
// });

var otherTodo = new Todo({
    // text: 'eat lunch', 
    // completed: true, 
    // completedAt: 123
});

// otherTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('unable to save todo')
// });

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    }
});

var newUser = new User({
    email: 'efavia215@live.com'
});

newUser.save().then((doc) => {
    console.log('saved user', doc)
}, (e) => {
    console.log('unable to save user')
})
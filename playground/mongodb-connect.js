// const MongoClient = require('mongodb').MongoClient;

// a ES6 destructuring for the require call above
const {MongoClient, ObjectID} = require('mongodb');

// var user = {name: 'Ethan', age: 26};
// // this is an example of ES6 destructuring it is a great way of creating new variables from object properties
// var {name} = user; 


// var obj = new OBjectID(); 



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db ) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    };
    console.log('Connected to MongoDB server');

    db.collection('Todos').insertOne({
        text: 'Workout',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);

        };

        console.log(JSON.stringify(result.ops, undefined, 2));
    });
});

//     db.collection('Users').insertOne({
//         name: 'Ethan Favia',
//         age: 26,
//         location: 'New Jersey'
//     }, (err, results) => {
//         if (err) {
//             return console.log('Unable to insert User', err);
//         };

//         console.log(JSON.stringify(results.ops[0]._id.getTimestamp(), undefined, 2));
//     });

//     db.close();
// });




// // var newTodo = new Todo({
// //     text: 'Get nintendo Gift card'
// // });

// // newTodo.save().then((doc) => {
// //     console.log('Saved todo', doc)
// // }, (e) => {
// //     console.log('Unable to save todo')
// // });

// var otherTodo = new Todo({
//     // text: 'eat lunch', 
//     // completed: true, 
//     // completedAt: 123
// });

// // otherTodo.save().then((doc) => {
// //     console.log('Saved todo', doc)
// // }, (e) => {
// //     console.log('unable to save todo')
// // });



// // var newUser = new User({
// //     email: 'efavia215@live.com'
// // });

// // newUser.save().then((doc) => {
// //     console.log('saved user', doc)
// // }, (e) => {
// //     console.log('unable to save user')
// // })
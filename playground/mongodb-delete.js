const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db ) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    };
    console.log('connected to MongoDB server');

    // deleteMany 
    // db.collection('Todos').deleteMany({
    //     text: 'get bagels'
    // }).then((result) => {
    //     console.log(result)
    // });

    // deleteONe
    // db.collection('Todos').deleteOne({
    //     text: 'get bagels'
    // }).then((result) => {
    //     console.log(result);
    // });


    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({
        name: 'Ethan Favia'
    }).then((result) => {
        console.log(result);
    });

    // db.collection('Users').findOneAndDelete({_id: new ObjectID("5900b397738524be05f2a579")}).then((result) => {
    //     console.log(result);
    // });
    // db.close();
});


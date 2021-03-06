const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID,
    text: 'test todo'
}, {
    _id: new ObjectID,
    text: 'second test todo',
    completed: true,
    completedAt: 12343
}
]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo post';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
            }).catch((e) => done(e));
        });
    });
    it('should not create todo with invalid body data', (done) => {

        request(app)   
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    });

    it('should return a 404 if todo not found', (done) => {
        request(app)
            .get('/todos/5902592e52e712a85d89114b')
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err)
                }
            done();
            })
    });

    it('should return a 404 for non-object id', (done) => {
        request(app)
            .get('/todos/1145135')
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
            done();
            })
    });
});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexID = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
            Todo.findById(hexID).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => done(e))
            });
            
                

    });

    it('should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString()

        request(app)    
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err)
                }
            done();
            })
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/1145135')
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
            done();
            })
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexID = todos[0]._id.toHexString();
        var text = 'New text to be updated'
        
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true)
                expect(res.body.todo.completedAt).toBeA('number')
            })
            .end(done)
    }); 

    it('should clear completedAt when todo is not completed', (done) => {
        var hexID = todos[1]._id.toHexString();
        var text = 'New text to be updated'
        
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false)
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done)
    });
}


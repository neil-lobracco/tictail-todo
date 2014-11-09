from flask import Flask, session, redirect, url_for, escape, request, render_template, jsonify, Response
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime, json

client = MongoClient()
users = client.todo.users
todos = client.todo.todos
app = Flask(__name__)

def getTodos(userId):
    ret = []
    if userId is not None:
        for todo in todos.find({"owner" : ObjectId(userId)}):
            todo['_id'] = str(todo['_id'])
            todo['owner'] = str(todo['owner'])
            ret.append(todo)
    return ret

def createTodo(ownerId, details):
    todo = dict(details,owner=ObjectId(ownerId))
    todoId = todos.insert(todo)
    todo['_id'] = str(todo['_id'])
    todo['owner'] = str(todo['owner'])
    return todo

def updateTodo(todo):
    todos.update({'_id' : ObjectId(todo['_id'])},{ '$set' : { 'complete' : todo['complete'] } })
    return todo

@app.route('/')
def home():
    context = {
        'userId' : session.get('userId'),
        'todos' : getTodos(session.get('userId'))
    }
    return render_template("index.html",**context)

@app.route('/sessions', methods=['POST'])
def login():
    username = request.json['username']
    user = users.find_one({username : username})
    userId = None
    if user is None:
        userId = str(users.insert({"username" : username, "created_at": datetime.datetime.now()}))
    else:
        userId = str(user._id)
    session['userId'] = userId
    return jsonify({ "result" : "success", "userId" : userId })

@app.route('/sessions/<id>', methods=['DELETE'])
def logout(userId):
    session['userId'] = None
    return jsonify({ "result" : "success"})

@app.route('/todos', methods=['GET'])
def index():
    return Response(json.dumps(getTodos(session.get('userId'))),  mimetype='application/json')

@app.route('/todos', methods=['POST'])
def create():
    todo = createTodo(session.get('userId'),request.json)
    return jsonify(todo)

@app.route('/todos/<todoId>', methods=['PUT'])
def update(todoId):
    updateTodo(request.json)
    return jsonify(request.json)

app.secret_key = "8xkgf643lkf23hf";
app.run(debug=True)

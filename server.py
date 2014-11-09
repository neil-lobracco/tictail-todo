from flask import Flask, session, redirect, url_for, escape, request, render_template, jsonify, Response
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime, json, os

client = MongoClient(os.getenv('MONGO_URL'))
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

def updateTodo(todo,expectedOwner):
    todos.update({'_id' : ObjectId(todo['_id']), 'owner' : ObjectId(expectedOwner)},{ '$set' : { 'complete' : todo['complete'] } })
    return todo

def removeTodo(todoId,expectedOwner):
    todos.remove({'_id' : ObjectId(todoId), 'owner' : ObjectId(expectedOwner)})
    return None

def getUser(userId):
    return users.find_one({'_id' : ObjectId(userId) })

@app.route('/')
def home():
    userId = session.get('userId')
    username = None
    user = getUser(userId)
    if user is None:
        userId = None
    else:
        username = user['username']
    context = {
        'userId' : userId,
        'todos' : getTodos(userId),
        'username' : username,
    }
    return render_template("index.html",**context)

@app.route('/sessions', methods=['POST'])
def login():
    username = request.json['username']
    user = users.find_one({'username' : username})
    userId = None
    if user is None:
        userId = str(users.insert({"username" : username, "created_at": datetime.datetime.now()}))
    else:
        userId = str(user['_id'])
    session['userId'] = userId
    return jsonify({ "result" : "success", "userId" : userId })

@app.route('/sessions/<userId>', methods=['DELETE'])
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
    updateTodo(request.json,session.get('userId'))
    return jsonify(request.json)

@app.route('/todos/<todoId>', methods=['DELETE'])
def destroy(todoId):
    removeTodo(todoId,session.get('userId'))
    return ""

app.secret_key = "8xkgf643lkf23hf";
app.secret_key = "8xkgf643lkf23hf";
port = int(os.getenv('PORT','5000'))
app.run(debug=True,port=port,host='0.0.0.0')

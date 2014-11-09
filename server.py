from flask import Flask, session, redirect, url_for, escape, request, render_template, jsonify, Response
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime, json

client = MongoClient()
users = client.todo.users
todos = client.todo.todos
app = Flask(__name__)

def getTodos(userId):
    if userId is None:
        return []
    return list(todos.find({"owner" : ObjectId(userId)}))

def createTodo(ownerId, details):
    obj = dict(details,owner=ownerId)
    todoId = todos.insert(obj)
    return obj

@app.route('/')
def home():
    context = {
        'userId' : session.get('userId'),
        'todos' : getTodos(session.get('userId'))
    }
    print context
    return render_template("index.html",**context)

@app.route('/sessions', methods=['POST'])
def login():
    username = request.args['username']
    user = users.find_one({username : username})
    userId = None
    if user is None:
        userId = str(users.insert({"username" : username, "created_at": datetime.datetime.now()}))
    else:
        userId = str(user._id)
    session['userId'] = userId
    return jsonify({ "result" : "success", "userId" : userId })

@app.route('/sessions/<id>t', methods=['DELETE'])
def logout(userId):
    session['userId'] = None
    return jsonify({ "result" : "success"})

@app.route('/todos', methods=['GET'])
def index():
    return Response(json.dumps(getTodos(session.get('userId'))),  mimetype='application/json')

@app.route('/todos', methods=['POST'])
def create():
    return jsonify(createTodo(session.get('userId'),request.args))

app.secret_key = "8xkgf643lkf23hf";
app.run(debug=True)

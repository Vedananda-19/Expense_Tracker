from flask import Flask,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
transactions = client["expense_tracker"]["transactions"]

app = Flask(__name__)
CORS(app)

@app.route("/api/")
def home():
    return jsonify("Hello World")

if __name__=="__main__":
    app.run(debug=True)
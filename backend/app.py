from flask import Flask,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
txns = client["expense_tracker"]["transactions"]

app = Flask(__name__)
CORS(app)

@app.route("/api/")
def home():
    return jsonify("Hello World")

@app.route("/api/transactions",methods=["GET","POST"])
def transactions():
    if request.method=="GET":
        transactionsList = list(txns.find().sort("date",-1))
        for doc in transactionsList:
            doc["_id"] = str(doc["_id"])
        return jsonify(transactionsList)
    if request.method=="POST":
        transaction = request.get_json()
        txns.insert_one(transaction)
        return jsonify("Inserted Successfully")

if __name__=="__main__":
    app.run(debug=True)
from flask import Flask,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient,DESCENDING
from bson import ObjectId

client = MongoClient("mongodb://localhost:27017/")
txns = client["expense_tracker"]["transactions"]

app = Flask(__name__)
CORS(app)

@app.route("/api/")
def home():
    return jsonify("Hello World")

@app.route("/api/transactions",methods=["GET","POST","DELETE"])
def transactions():
    if request.method=="GET":
        transactionsList = list(txns.find().sort([("date",DESCENDING),("_id",DESCENDING)]))
        for doc in transactionsList:
            doc["_id"] = str(doc["_id"])
        return jsonify(transactionsList)
    if request.method=="POST":
        transaction = request.get_json()
        txns.insert_one(transaction)
        return jsonify("Inserted Successfully")
    if request.method=="DELETE":
        txnId = request.get_json()
        txns.delete_one({"_id":ObjectId(txnId)})
        return jsonify("Deleted Successfully")

if __name__=="__main__":
    app.run(debug=True)
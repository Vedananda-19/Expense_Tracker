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

@app.route("/api/transactions",methods=["GET","POST","DELETE","PATCH"])
def transactions():
    if request.method=="GET":
        transactionsList = list(txns.find().sort([("date",DESCENDING),("_id",DESCENDING)]))
        for doc in transactionsList:
            doc["_id"] = str(doc["_id"])
        return jsonify(transactionsList)
    
    elif request.method=="POST":
        transaction = request.get_json()
        transaction["amount"] = int(transaction["amount"])
        txns.insert_one(transaction)
        return jsonify("Inserted Successfully")
    
    elif request.method=="DELETE":
        txnId = request.get_json()
        txns.delete_one({"_id":ObjectId(txnId)})
        return jsonify("Deleted Successfully")
    
    elif request.method=="PATCH":
        transaction = request.get_json()
        txnId = transaction["txnId"]
        del transaction["txnId"]
        transaction["amount"] = int(transaction["amount"])
        txns.replace_one({"_id":ObjectId(txnId)},transaction)
        return jsonify("Edited Successfully")
if __name__=="__main__":
    app.run(debug=True)
import { useState, useContext } from "react";
import TxnContext from "../Context/TxnContextProvider";
import TransactionForm from "../Components/TransactionForm"



function TrackerPage() {
    const { txnList, loadTransactions } = useContext(TxnContext)!;
    const [selectedTxnId,setSelectedTxnId] = useState("")

    const deleteTransaction = async (txnId:string) => {
        try{
            const response = await fetch("/api/transactions",{method:"DELETE",headers:{"Content-type":"application/json"},body:JSON.stringify(txnId)})
            const data = await response.json()
            console.log(data)
            await loadTransactions()
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Transactions</h1>
            <TransactionForm mode="add"/>
            {txnList.length > 0 ? (
                <div>
                    {txnList.map((transaction, idx) => {
                        return (
                                selectedTxnId!==transaction["_id"]?
                                <li key={transaction["_id"]}>
                                    <p>{idx + 1}</p>
                                    <p>{transaction.amount}</p>
                                    <p>{transaction.category}</p>
                                    <p>{transaction.date}</p>
                                    <button onClick={() => setSelectedTxnId(transaction["_id"])}>Edit</button>
                                    <button
                                        onClick={() =>
                                            deleteTransaction(transaction["_id"])
                                        }
                                    >
                                        Delete
                                    </button>
                                </li>
                                :
                                <li key={transaction["_id"]}>
                                    <TransactionForm mode="edit" txnData={transaction} setSelectedTxnId={setSelectedTxnId}/>
                                </li>
                        );
                    })}
                </div>
            ) : (
                <h3>No Transactions were Added</h3>
            )}
        </div>
    );
}

export default TrackerPage;

import { useEffect, useState, useContext } from "react";
import defaultCategories from "../data/defaultCategories";
import { TxnContext } from "../Context/TxnContextProvider";

function TrackerPage() {
    const [txnAmount, setTxnAmount] = useState<string>("");
    const [txnCategory, setTxnCategory] = useState<string>("");
    const [txnDate, setTxnDate] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const { txnList, loadTransactions } = useContext(TxnContext)!;

    const [categories, setCategories] = useState<string[]>(() => {
        const stored = localStorage.getItem("categories");
        return stored ? JSON.parse(stored) : defaultCategories;
    });
    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    const addTransaction = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const category = txnCategory.trim();
        const date = txnDate ? txnDate : new Date().toISOString().split("T")[0];
        if (new Date(date) > new Date()) {
            setErrorMsg("Invalid Date");
            return;
        }
        categories.includes(txnCategory) ||
            setCategories([...categories, txnCategory]);

        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    amount: txnAmount,
                    category: category,
                    date: date,
                }),
            });
            const data = await response.json();
            console.log(data);
            loadTransactions();
        } catch (error) {
            console.log(error);
            setErrorMsg("An Error Occured");
        } finally {
            setErrorMsg("");
            setTxnAmount("");
            setTxnCategory("");
            setTxnDate("");
        }
    };
    const deleteTransaction = async (txnId:string) => {
        try{
            const response = await fetch("/api/transactions",{method:"DELETE",headers:{"Content-type":"application/json"},body:JSON.stringify(txnId)})
            const data = await response.json()
            console.log(data)
            loadTransactions()
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Transactions</h1>
            <form onSubmit={addTransaction}>
                <input
                    onChange={(e) => setTxnAmount(e.target.value)}
                    type="number"
                    placeholder="Amount"
                    value={txnAmount}
                    required
                />
                <input
                    onChange={(e) => setTxnCategory(e.target.value)}
                    type="text"
                    placeholder="txnCategory"
                    value={txnCategory}
                    required
                />
                <input
                    onChange={(e) => setTxnDate(e.target.value)}
                    type="date"
                    value={txnDate}
                />
                <button type="submit">Add</button>
                {errorMsg && <p>{errorMsg}</p>}
            </form>
            {categories.length > 0 && (
                <div>
                    {categories.map((category, idx) => {
                        return (
                            <button
                                onClick={() => setTxnCategory(category)}
                                key={idx}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            )}
            {txnList.length > 0 ? (
                <div>
                    {txnList.map((transaction, idx) => {
                        return (
                            <li key={transaction["_id"]}>
                                <p>{idx + 1}</p>
                                <p>{transaction.amount}</p>
                                <p>{transaction.category}</p>
                                <p>{transaction.date}</p>
                                <button onClick={() => {}}>Edit</button>
                                <button
                                    onClick={() =>
                                        deleteTransaction(transaction["_id"])
                                    }
                                >
                                    Delete
                                </button>
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

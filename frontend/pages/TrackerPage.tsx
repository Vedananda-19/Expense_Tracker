import { useEffect, useState } from "react";
import defaultCategories from "../data/defaultCategories";

type Transaction = {
    amount: number;
    category: string;
    date: string;
};

function TrackerPage() {
    const [txnAmount, setTxnAmount] = useState<string>("");
    const [txnCategory, setTxnCategory] = useState<string>("");
    const [txnDate, setTxnDate] = useState<string>("");
    const [errorMsg,setErrorMsg] = useState<string>("");

    const [txnList, setTxnList] = useState<Transaction[]>(() => {
        const stored = localStorage.getItem("txnList");
        return stored ? JSON.parse(stored) : [];
    });
    const [categories,setCategories] = useState<string[]>(() => {
        const stored = localStorage.getItem("categories")
        return stored ? JSON.parse(stored) : defaultCategories;
    })
    useEffect(() => {localStorage.setItem("txnList",JSON.stringify(txnList))},[txnList])
    useEffect(() => {localStorage.setItem("categories",JSON.stringify(categories))},[categories])

    const addTransaction = (e: React.SubmitEvent) => {
        e.preventDefault();

        const category = txnCategory.trim()
        const date = txnDate ? txnDate : new Date().toISOString().split("T")[0];
        if (new Date(date) > new Date()){
            setErrorMsg("Invalid Date")
            return
        }
        categories.includes(txnCategory) || setCategories([...categories,txnCategory])

        setTxnList([
            ...txnList,
            {amount: Number(txnAmount), category: category, date: date },
        ]);
        console.log("Added Successfully", txnAmount, txnCategory, txnDate);

        setErrorMsg("");
        setTxnAmount("");
        setTxnCategory("");
        setTxnDate("");
    };
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
            {categories.length>0 && (
                <div>
                    {
                        categories.map((category,idx) => {
                            return(
                                <button onClick={() => setTxnCategory(category)} key={idx}>{category}</button>
                            )
                        })
                    }
                </div>
            )}
            {txnList.length>0 ? 
                <div>
                    {txnList.map((transaction, idx) => {
                        return (
                            <li key={idx}>
                                <p>{idx}</p>
                                <p>{transaction.amount}</p>
                                <p>{transaction.category}</p>
                                <p>{transaction.date}</p>
                            </li>
                        );
                    })}
                </div> : (
                    <h3>No Transactions were Added</h3>
                )
            }
        </div>
    );
}

export default TrackerPage;

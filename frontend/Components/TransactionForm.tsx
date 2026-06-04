import { useState, useEffect, useContext } from "react";
import TxnContext from "../Context/TxnContextProvider";
import defaultCategories from "../data/defaultCategories";

type Transaction = {
    _id?: string;
    amount: number;
    category: string;
    date: string;
};
type propsType = {
    mode: string;
    txnData?: Transaction;
    setSelectedTxnId?: React.Dispatch<React.SetStateAction<string>>
};

function TransactionForm({ mode, txnData, setSelectedTxnId }: propsType) {
    const [txnAmount, setTxnAmount] = useState<string>(
        txnData ? String(txnData.amount) : "",
    );
    const [txnCategory, setTxnCategory] = useState<string>(
        txnData ? txnData.category : "",
    );
    const [txnDate, setTxnDate] = useState<string>(txnData ? txnData.date : "");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const { loadTransactions } = useContext(TxnContext)!;

    const [categories, setCategories] = useState<string[]>(() => {
        const stored = localStorage.getItem("categories");
        return stored ? JSON.parse(stored) : defaultCategories;
    });
    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    const resetForm = () => {
        setTxnAmount("");
        setTxnCategory("");
        setTxnDate("");
        setErrorMsg("");
        setSelectedTxnId && setSelectedTxnId("")
    };
    const addTransaction = async (e: React.SubmitEvent, mode: string, txnId: string="") => {
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
                method: mode === "add" ? "POST" : "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    txnId: txnId ? txnId : undefined,
                    amount: txnAmount,
                    category: category,
                    date: date,
                }),
            });
            const data = await response.json();
            console.log(data);
            await loadTransactions();
        } catch (error) {
            console.log(error);
            setErrorMsg("An Error Occured");
        } finally {
            resetForm();
        }
    };
    return (
        <form onSubmit={(e) => addTransaction(e, mode, txnData && txnData["_id"])}>
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
            <button type="submit">{mode === "add" ? "Add" : "Save"}</button>
            {errorMsg && <p>{errorMsg}</p>}
            {categories.length > 0 && (
                <div>
                    {categories.map((category, idx) => {
                        return (
                            <button
                                type = "button"
                                onClick={() => setTxnCategory(category)}
                                key={idx}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            )}
        </form>
    );
}

export default TransactionForm;

import { createContext,useState,useEffect, type ReactElement} from "react";
import { monthData } from "../data/calendarData";

type Transaction = {
    _id: string;
    amount: number;
    category: string;
    date: string;
};
type TxnContextType = {
    txnList : Transaction[];
    loadTransactions : () => Promise<void>;
    findTotal : (transactions:Transaction[]) => number;
    findByDate({ year, month, day }: dateType): Transaction[]
    findMonthlySpendings(): {month: string,amount: number}[]
    findCategorySpendings(transactions: Transaction[]): {
    category: string;
    amount: number;
    }[]
}
type dateType = {
    year?: number;
    month?: number;
    day?: number;
};

const TxnContext = createContext<TxnContextType | null>(null)

export function TxnContextProvider({children} : {children : ReactElement}){
    const [txnList,setTxnList] = useState<Transaction[]>([])

    const loadTransactions = async () => {
        try{
            const response = await fetch("/api/transactions")
            const transactions = await response.json()
            console.log(transactions)
            setTxnList(transactions)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() => {loadTransactions()},[])

    const findTotal = (transactions:Transaction[]) => {
        let sum = 0
        transactions.forEach(txn => sum += txn["amount"])
        return sum
    }
    function findByDate({ year, month, day }: dateType) {
        const monthTxns = txnList.filter((txn) => {
            return (
                (year ? Number(txn["date"].slice(0, 4)) === year : true) &&
                (month ? Number(txn["date"].slice(5, 7)) === month : true) &&
                (day ? Number(txn["date"].slice(8, 10)) === day : true)
            );
        });
        return monthTxns;
    }
    function findMonthlySpendings() {
        let currMonth = new Date().getMonth() + 1;
        let currYear = new Date().getFullYear();
        let monthlySpendings = [];
        for (let i = 0; i < 12; i++) {
            monthlySpendings.push({
                month: monthData[currMonth],
                amount: findTotal(
                    findByDate({ year: currYear, month: currMonth }),
                ),
            });
            currMonth -= 1;
            if (currMonth === 0) {
                currMonth = 12;
                currYear -= 1;
            }
        }
        return monthlySpendings.reverse();
    }

    function findCategorySpendings(transactions:Transaction[]){
        let categorySpendings : Record<string,number> = {}
        transactions.forEach(txn => {
            if (categorySpendings[txn.category]) categorySpendings[txn.category] += txn.amount
            else categorySpendings[txn.category] = txn.amount
        });
        return Object.entries(categorySpendings).map(([category,amount]) => ({category:category,amount:amount}))
    }
    
    return(
        <TxnContext value={{txnList,loadTransactions,findTotal,findByDate,findMonthlySpendings,findCategorySpendings}}>
            {children}
        </TxnContext>
    )
}

export default TxnContext
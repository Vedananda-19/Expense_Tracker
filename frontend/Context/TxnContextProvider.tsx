import { createContext,useState,useEffect, type ReactElement} from "react";

type Transaction = {
    _id: string;
    amount: number;
    category: string;
    date: string;
};
type TxnContextType = {
    txnList : Transaction[];
    loadTransactions : () => Promise<void>;
}

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
    
    return(
        <TxnContext value={{txnList,loadTransactions}}>
            {children}
        </TxnContext>
    )
}

export default TxnContext
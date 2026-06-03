import { createContext,useState,useEffect} from "react";

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

export const TxnContext = createContext<TxnContextType | null>(null)

function TxnContextProvider({children} : any){
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

export default TxnContextProvider
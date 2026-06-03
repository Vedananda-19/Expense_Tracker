import React, { createContext,useState,useEffect} from "react";

type Transaction = {
    _id: string;
    amount: number;
    category: string;
    date: string;
};
type TxnContextType = {
    txnList : Transaction[];
    setTxnList : React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TxnContext = createContext<TxnContextType | null>(null)

function TxnContextProvider({children} : any){
    const [txnList,setTxnList] = useState<Transaction[]>([])

    const loadTransactions = async () => {
        try{
            const response = await fetch("/api/transactions")
            const transactions = await response.json()
            console.log(transactions)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() => {loadTransactions()},[])
    
    return(
        <TxnContext.Provider value={{txnList,setTxnList}}>
            {children}
        </TxnContext.Provider>
    )
}

export default TxnContextProvider
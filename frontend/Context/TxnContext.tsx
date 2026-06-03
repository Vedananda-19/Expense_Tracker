import { createContext,useState } from "react";

type Transaction = {
    amount: number;
    category: string;
    date: string;
};
const TxnContextProvider = createContext(null)

function TxnContext(){
    const [txnList,setTxnList] = useState<Transaction[]>([])
    
}
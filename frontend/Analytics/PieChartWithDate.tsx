import { useState, useContext } from "react";
import TxnContext from "../Context/TxnContextProvider";
import styles from "../pages/AnalyticsPage.module.css";
import CategoryPieChart from './CategoryPieChart'
import DateFilter from "../Components/DateFilter"

type Transaction = {
    _id: string;
    amount: number;
    category: string;
    date: string;
};

function PieChartWithDate() {
    const [transactions,setTransactions] = useState<Transaction[]>([])
    const {findCategorySpendings} = useContext(TxnContext)!
    const chartData = findCategorySpendings(transactions)

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartHeading}>Spendings By Category</h3>
            <div className={styles.pieChartRow}>
                <DateFilter setList={setTransactions}/>
                <div className={styles.pieChartContainer}>        
                    <CategoryPieChart categorySpendings={chartData}/>
                    {chartData.length===0 && <h4>No transactions were made on the day</h4>}
                </div>
            </div>
        </div>
    );
}

export default PieChartWithDate;

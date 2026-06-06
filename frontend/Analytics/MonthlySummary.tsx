import styles from "./MonthlySummary.module.css";
import {useState,useContext} from "react"
import TxnContext from "../Context/TxnContextProvider";
import { monthData } from "../data/calendarData";


function MonthlySummary() {
    const [month,setMonth] = useState<number>(new Date().getMonth()+1)
    const {findByDate,findTotal} = useContext(TxnContext)!
    const monthTxns = findByDate({month:month})
    const monthsList = Object.values(monthData);

    const transactionCount = monthTxns.length
    const totalSpent = findTotal(monthTxns)
    const dailyAverage = Math.round(totalSpent / 30);

    return (
        <div>
            <div>
                <label className={styles.filterLabel}>Select Month:</label>
                <select
                    className={styles.filterSelect}
                    value={month}
                    onChange={(e) => {setMonth(Number(e.target.value))}}
                >
                    <option key={-1} value={0}>
                        All
                    </option>
                    {monthsList.map((month, idx) => {
                        return (
                            <option key={idx} value={idx + 1}>
                                {month}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={styles.summaryCard}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Monthly Summary</h3>
                    <span className={styles.month}>{month}</span>
                </div>

                <div className={styles.spendingSection}>
                    <p className={styles.spendingLabel}>Total Spent</p>
                    <h2 className={styles.totalSpent}>
                        ₹{totalSpent.toLocaleString()}
                    </h2>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>
                            Transactions
                        </span>
                        <span className={styles.statValue}>
                            {transactionCount}
                        </span>
                    </div>

                    <div className={styles.stat}>
                        <span className={styles.statLabel}>
                            Daily Avg
                        </span>
                        <span className={styles.statValue}>
                            ₹{dailyAverage.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MonthlySummary;
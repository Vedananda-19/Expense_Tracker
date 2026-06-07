import styles from "./MonthlySummary.module.css";
import { useState, useContext } from "react";
import TxnContext from "../Context/TxnContextProvider";
import { monthData } from "../data/calendarData";
import DateFilter from "../Components/DateFilter";

type Transaction = {
    _id: string;
    amount: number;
    category: string;
    date: string;
};

function MonthlySummary() {
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

    const { findTotal } = useContext(TxnContext)!;
    const [monthTxns, setMonthTxns] = useState<Transaction[]>([]);

    const transactionCount = monthTxns.length;
    const totalSpent = findTotal(monthTxns);
    const dailyAverage = transactionCount > 0 ? Math.round(totalSpent / 30) : 0;
    const highestExpense =
        monthTxns.length > 0
            ? Math.max(...monthTxns.map((txn) => txn.amount))
            : 0;

    return (
        <div className={styles.summaryContainer}>
            <h3 className={styles.title}>Monthly Summary</h3>

            <DateFilter
                setList={setMonthTxns}
                isOnlyMonth={true}
                setMonth={setMonth}
                variant="summary"
            />

            <div className={styles.summaryCard}>
                <div className={styles.mainMetric}>
                    <h1 className={styles.amount}>
                        ₹{totalSpent.toLocaleString()}
                    </h1>
                    <p>Total Spent</p>
                </div>
                <div className={styles.statsGrid}>
                    <div className={styles.stat}>
                        <h3 className={styles.statText}>
                            <span className={styles.statHeading}>
                                Daily Avg:
                            </span>
                            <span className={styles.statValue}>
                                ₹{dailyAverage.toLocaleString()}
                            </span>
                        </h3>
                    </div>

                    <div className={styles.stat}>
                        <h3 className={styles.statText}>
                            <span className={styles.statHeading}>Month:</span>
                            <span className={styles.statValue}>
                                {monthData[month]}
                            </span>
                        </h3>
                    </div>

                    <div className={styles.stat}>
                        <h3 className={styles.statText}>
                            <span className={styles.statHeading}>
                                Transactions:
                            </span>
                            <span className={styles.statValue}>
                                {transactionCount}
                            </span>
                        </h3>
                    </div>

                    <div className={styles.stat}>
                        <h3 className={styles.statText}>
                            <span className={styles.statHeading}>
                                Highest Expense:
                            </span>
                            <span className={styles.statValue}>
                                ₹{highestExpense.toLocaleString()}
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MonthlySummary;

import styles from "./AnalyticsPage.module.css";
import { useContext, useMemo } from "react";
import TxnContext from "../Context/TxnContextProvider";
import MonthlySpendingChart from "../Graphs/MonthlyspendingChart";
import PieChartWithDate from "../Graphs/PieChartWithDate"

function AnalyticsPage() {
    const { txnList, findMonthlySpendings } = useContext(TxnContext)!;
    const monthlySpendings = useMemo(() => findMonthlySpendings(), [txnList]);

    return (
        <div className="themeBackground">
            <h1>Analytics</h1>
            <div className={styles.container}>
                <MonthlySpendingChart monthlySpendings={monthlySpendings} />
                <PieChartWithDate />
                <MonthlySpendingChart monthlySpendings={monthlySpendings} />
            </div>
        </div>
    );
}

export default AnalyticsPage;

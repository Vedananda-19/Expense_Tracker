import styles from "./AnalyticsPage.module.css";
import { useContext, useMemo } from "react";
import TxnContext from "../Context/TxnContextProvider";
import MonthlySpendingChart from "../Analytics/MonthlyspendingChart";
import PieChartWithDate from "../Analytics/PieChartWithDate"
import MonthlySummary from "../Analytics/MonthlySummary"

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
                <MonthlySummary/>
            </div>
        </div>
    );
}

export default AnalyticsPage;

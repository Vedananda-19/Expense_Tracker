import { useState, useEffect, useContext, useMemo } from "react";
import TxnContext from "../Context/TxnContextProvider";
import { getDaysList, monthData } from "../data/calendarData";
import styles from "./DateFilter.module.css";

type Transaction = {
    _id: string;
    amount: number;
    category: string;
    date: string;
};
type filterProps = {
    setList: React.Dispatch<React.SetStateAction<Transaction[]>>;
    isDate?: boolean;
    isOnlyMonth?: boolean;
    setMonth?: React.Dispatch<React.SetStateAction<number>>;
    variant?: string;
};

function DateFilter({
    setList,
    isDate = true,
    isOnlyMonth = false,
    setMonth,
    variant,
}: filterProps) {
    const currDate = new Date();
    const [chartYear, setChartYear] = useState(currDate.getFullYear());
    const [chartMonth, setChartMonth] = useState(currDate.getMonth() + 1);
    const [chartDay, setChartDay] = useState<number>(0);
    const { txnList, findByDate } = useContext(TxnContext)!;

    useEffect(() => {
        setList(
            findByDate({
                year: chartYear,
                month: chartMonth,
                day: isDate && !isOnlyMonth ? chartDay : 0,
            }),
        );
        setMonth && setMonth(chartMonth);
    }, [chartYear, chartMonth, chartDay, txnList]);

    const findYears = () => {
        const years = new Set<number>();
        txnList.forEach((txn) => {
            years.add(new Date(txn.date).getFullYear());
        });
        return [...years];
    };
    const yearsList = useMemo(() => findYears(), [txnList]);
    const monthsList = Object.values(monthData);
    const daysList = getDaysList(chartYear, chartMonth);
    return (
        <div
            className={`${
                variant === "transactions"
                    ? styles.transactionsFilter
                    : variant === "summary"
                      ? styles.summaryFilter
                      : styles.filterContainer
            }`}
        >
            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Select Year:</label>
                <select
                    className={styles.filterSelect}
                    value={chartYear}
                    onChange={(e) => {
                        setChartYear(Number(e.target.value));
                        setChartDay(0);
                    }}
                >
                    <option key={-1} value={0}>
                        All
                    </option>
                    {yearsList.map((year, idx) => (
                        <option key={idx} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Select Month:</label>
                <select
                    className={styles.filterSelect}
                    value={chartMonth}
                    onChange={(e) => {
                        setChartMonth(Number(e.target.value));
                        setChartDay(0);
                    }}
                >
                    {!isOnlyMonth && (
                        <option key={-1} value={0}>
                            All
                        </option>
                    )}

                    {monthsList.map((month, idx) => (
                        <option key={idx} value={idx + 1}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {isDate && !isOnlyMonth && (
                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Select Day:</label>
                    <select
                        className={styles.filterSelect}
                        value={chartDay}
                        onChange={(e) => setChartDay(Number(e.target.value))}
                    >
                        <option key={-1} value={0}>
                            All
                        </option>

                        {daysList.map((day, idx) => (
                            <option key={idx} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default DateFilter;

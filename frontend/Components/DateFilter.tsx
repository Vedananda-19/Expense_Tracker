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
    isOnlyMonth?: boolean
};

function DateFilter({ setList, isDate = true, isOnlyMonth = false }: filterProps) {
    const currDate = new Date();
    const [chartYear, setChartYear] = useState(currDate.getFullYear());
    const [chartMonth, setChartMonth] = useState(currDate.getMonth() + 1);
    const [chartDay, setChartDay] = useState<number>(0);
    const { txnList, findByDate } = useContext(TxnContext)!;

    useEffect(
        () =>{
                setList(
                    findByDate({
                        year: chartYear,
                        month: chartMonth,
                        day: isDate||isOnlyMonth ? chartDay : 0,
                    }),
                )
            },
        [chartYear, chartMonth, chartDay],
    );

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
        <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>Select Year:</label>
            <select
                className={styles.filterSelect}
                value={chartYear}
                onChange={(e) => {
                    setChartYear(Number(e.target.value));
                    setChartDay(0);
                }}
            >
                <option key={-1}>All</option>
                {yearsList.map((year, idx) => {
                    return (
                        <option key={idx} value={year}>
                            {year}
                        </option>
                    );
                })}
            </select>
            <label className={styles.filterLabel}>Select Month:</label>
            <select
                className={styles.filterSelect}
                value={chartMonth}
                onChange={(e) => {
                    setChartMonth(Number(e.target.value));
                    setChartDay(0);
                }}
            >
                {!isOnlyMonth && <option key={-1} value={0}>
                    All
                </option>}
                {monthsList.map((month, idx) => {
                    return (
                        <option key={idx} value={idx + 1}>
                            {month}
                        </option>
                    );
                })}
            </select>
            {isDate||isOnlyMonth && (
                <div>
                    <label className={styles.filterLabel}>Select Day:</label>
                    <select
                        className={styles.filterSelect}
                        value={chartDay}
                        onChange={(e) => setChartDay(Number(e.target.value))}
                    >
                        <option key={-1} value={0}>
                            All
                        </option>
                        {daysList.map((day, idx) => {
                            return (
                                <option key={idx} value={day}>
                                    {day}
                                </option>
                            );
                        })}
                    </select>
                </div>
            )}
        </div>
    );
}

export default DateFilter;

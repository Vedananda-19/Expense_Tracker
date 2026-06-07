import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import styles from "../pages/AnalyticsPage.module.css";

type MonthlySpending = {
    month: string;
    amount: number;
};

function MonthlySpendingChart({
    monthlySpendings,
}: {
    monthlySpendings: MonthlySpending[];
}) {
    console.log(monthlySpendings);
    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.monthlyChartHeading}>Monthly Spendings</h3>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={monthlySpendings}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis dataKey="month" tickLine={false} axisLine={false} />

                    <YAxis tickLine={false} axisLine={false} />

                    <Tooltip
                        formatter={(value) => [
                            `₹${value!.toLocaleString()}`,
                            "Spent",
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#509DB5"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MonthlySpendingChart;

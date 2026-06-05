import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import styles from "../pages/AnalyticsPage.module.css"

type CategorySpending = {
    category: string;
    amount: number;
};

const COLORS = [
    "#00ADB5",
    "#13ce42",
    "#509DB5",
    "#F94144",
    "#6C63FF",
    "#FFB703",
    "#8ECAE6",
    "#FB8500",
    "#8ECAE6",
    "#90BE6D",
];

function CategoryPieChart({
    categorySpendings,
}: {
    categorySpendings: CategorySpending[];
}) {
    console.log(categorySpendings)
    return (
        <ResponsiveContainer width="100%" height="85%">
            <PieChart>
                <Pie
                    data={categorySpendings}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) =>
                        `${name} ${(percent! * 100).toFixed(0)}%`
                    }
                >
                    {categorySpendings.map((_, index) => (
                        <Cell
                            key={index}
                            fill={
                                COLORS[index % COLORS.length]
                            }
                        />
                    ))}
                </Pie>

                <Tooltip
                    formatter={(value) => [
                        `₹${Number(value).toLocaleString()}`,
                        "Spent",
                    ]}
                />

                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default CategoryPieChart;
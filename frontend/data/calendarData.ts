export const monthData: Record<number,string>= {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
};
export function getDaysList(year: number, month: number): number[] {
    const numDays = new Date(year, month, 0).getDate();

    return Array.from(
        { length: numDays },
        (_, i) => i + 1
    );
}
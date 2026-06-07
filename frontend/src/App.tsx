import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrackerPage from "../pages/TrackerPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import MainLayout from "../Layouts/MainLayout";
import { TxnContextProvider } from "../Context/TxnContextProvider";

const router = createBrowserRouter(
    [
        {
            element: <MainLayout />,
            children: [
                { path: "/", element: <TrackerPage /> },
                { path: "/analytics", element: <AnalyticsPage /> },
            ],
        },
    ],
    {
        basename: "/Expense_Tracker",
    },
);

function App() {
    return (
        <>
            <TxnContextProvider>
                <RouterProvider router={router} />
            </TxnContextProvider>
        </>
    );
}

export default App;

import { useNavigate, useLocation } from "react-router-dom";

export function NavBar() {
    return <div className="navbar"></div>;
}

export function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="sidebar">
            <div
                className={`sidebarEl ${location.pathname === "/" ? "active" : ""}`}
                onClick={() => navigate("/")}
            >
                Transactions
            </div>
            <div
                className={`sidebarEl ${location.pathname === "/analytics" ? "active" : ""}`}
                onClick={() => navigate("/analytics")}
            >
                Analytics
            </div>
        </div>
    );
}

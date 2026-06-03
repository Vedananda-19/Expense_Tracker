import { NavBar,SideBar } from "../Components/LayoutComponents"
import { Outlet } from "react-router-dom"

function MainLayout(){
    return(
        <>
            <div className="mainLayout">
                <NavBar />
                <div className="contentLayout">
                    <SideBar />
                    <div className="main">
                        <Outlet />
                    </div>
                </div>
            </div>    
        </>
    )
}

export default MainLayout
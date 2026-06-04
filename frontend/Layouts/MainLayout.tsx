import { NavBar } from "../Components/LayoutComponents"
import { Outlet } from "react-router-dom"

function MainLayout(){
    return(
        <>
            <div className="mainLayout">
                <NavBar />
                <Outlet />
            </div>    
        </>
    )
}

export default MainLayout
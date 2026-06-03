import {createBrowserRouter,RouterProvider} from "react-router-dom"
import TrackerPage from "../pages/TrackerPage"
import AnalyticsPage from "../pages/AnalyticsPage"
import MainLayout from "../Layouts/MainLayout"

const router = createBrowserRouter([
  {
    element:<MainLayout />,
    children:[
      {path:"/",element:<TrackerPage />},
      {path:"/analytics",element:<AnalyticsPage />}
    ]
  }
])

function App(){
    return(
      <>
        <RouterProvider router={router} />
      </>
    )
}

export default App

import SideBar from "@/components/side-bar"
import { Outlet } from "react-router-dom"

const MainPage = () => {
  return (
    <div className="w-full h-full flex">
        <SideBar/>
        <Outlet/>
    </div>

  )
}

export default MainPage

import SideBar from "@/components/side-bar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="w-full h-full flex">
      <TooltipProvider>
        <SideBar />
        <Outlet />
      </TooltipProvider>
    </div>
  );
};

export default MainPage;

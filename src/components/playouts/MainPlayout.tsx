import SideBar from "components/ui/SideBar";
import { Outlet } from "react-router-dom";

const MainPlayout = () => {
  return (
    <div className="flex ">
      <SideBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPlayout;

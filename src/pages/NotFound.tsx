import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const naviagte = useNavigate();
  return (
    <div className=" h-full">
      <div className="h-screen w-screen relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            className="lg:w-full sm:h-full lg:object-cover lg:object-center sm:object-cover sm:object-center"
            src="/images/notfound.jpg"
          />
        </div>
        <div className="absolute top-0 left-0 lg:w-full h-full"></div>
        <div className="absolute lg:top-[10%] lg:right-[8%] sm:top-[18%] sm:right-[3%]">
          <div className="flex items-baseline">
            <p className="text-[#fd9e20] lg:text-[150px] sm:text-[80px] font-bold">
              4 <span className="!text-[#f66245]">0</span> 4
            </p>
            <p className="text-white lg:text-3xl sm:text-2xl font-semibold pl-3">
              NOT FOUND
            </p>
          </div>
          <Button
            onClick={() => {
              naviagte("/");
            }}
            className=" !ml-9 lg:!h-[50px] sm:!h-[40px] !text-white lg:!text-[20px] sm:!text-[15px] !bg-[#f66245] !border-[#f66245]  hover:!text-[#f66245] hover:lg:!text-[25px] hover:sm:!text-[20px] hover:!bg-white"
          >
            <i className="fa-solid fa-arrow-left mr-3"></i> Return to home page
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;

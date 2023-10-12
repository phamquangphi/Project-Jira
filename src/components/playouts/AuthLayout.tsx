import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="AuthLayout h-full">
      <div className="h-screen w-screen relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            className="lg:w-full sm:h-full lg:object-cover lg:object-center sm:object-cover sm:object-center"
            src="/images/background.jpg"
          />
        </div>
        <div className="absolute top-0 left-0 lg:w-full h-full"></div>
        <div className="absolute lg:w-[450px] lg:p-[30px] sm:w-[300px] sm:p-[20px] top-1/2 left-1/2 backdrop-blur-[12px] -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

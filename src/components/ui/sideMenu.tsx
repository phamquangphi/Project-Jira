import { PATH } from "constant/config";

import { NavLink } from "react-router-dom";

import styled from "styled-components";

export const sideMenu = () => {
  return (
    <Section>
      {/* account */}
      <div className="account flex items-center mt-7 ml-10">
        <img className="w-10" src="/images/logojira.jpg" alt="" />
        <div className="pl-3">
          <p className="text-[1.25rem] font-medium text-[#496082]">
            JiraClone.vn
          </p>
          <p className="font-light text-[1rem]">Report bugs</p>
        </div>
      </div>
      {/* top */}
      <div className="pt-14 ml-[3.125rem] mb-5 cursor-pointer Menu">
        <NavLink
          to={PATH.create}
          className="flex items-center pt-3 List-Menu hover:text-blue-700 focus:text-blue-700"
        >
          <i className="fa-solid fa-gear text-base mr-1"></i>
          <p className="font-light text-[1.063rem]">Create project</p>
        </NavLink>
        <NavLink
          to={PATH.manager}
          className="flex items-center pt-3 List-Menu hover:text-blue-700 focus:text-blue-700"
        >
          <i className="fa-solid fa-gear text-base mr-1"></i>
          <p className="font-light text-[1.063rem]">Project management</p>
        </NavLink>
        <NavLink
          to={PATH.user}
          className="flex items-center pt-3 List-Menu hover:text-blue-700 focus:text-blue-700"
        >
          <i className="fa-solid fa-gear text-base mr-1"></i>
          <p className="font-light text-[1.063rem]">User management</p>
        </NavLink>
      </div>
      <div className="bg-[rgba(0,0,0,0.5)] py-[1px] mx-6"></div>
      {/* bottom */}
      <div className="mt-7 ml-[3.125rem] cursor-pointer Menu ">
        <p className="flex items-center List-Menu hover:text-blue-700 ">
          <i className="fa-solid fa-truck mr-1"></i>
          <p className="font-light text-[1.063rem]">Releases</p>
        </p>
        <p className="flex items-center mt-3 List-Menu hover:text-blue-700 ">
          <i className="fa-solid fa-equals mr-1"></i>
          <p className="font-light text-[1.063rem]">Issues and filters</p>
        </p>
        <p className="flex items-center mt-3 List-Menu hover:text-blue-700 ">
          <i className="fa-solid fa-location-arrow"></i>
          <p className="font-light text-[1.063rem] ml-1">Reports</p>
        </p>
        <p className="flex items-center mt-3 List-Menu hover:text-blue-700 ">
          <i className="fa-solid fa-boxes-packing"></i>
          <p className="font-light text-[1.063rem] ml-1">Components</p>
        </p>
      </div>
    </Section>
  );
};

export default sideMenu;
const Section = styled.div`
  .Menu {
    .List-Menu {
      position: relative;
    }
    .List-Menu::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background: #40a9ff;
      height: 0.125rem;
      width: 0%;
      transition: all 0.3s;
    }
    .List-Menu:hover::before {
      width: 70%;
    }
  }
`;

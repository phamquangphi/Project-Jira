import SideMenu from "./sideMenu";
import { useState } from "react";
import { BarsOutlined } from "@ant-design/icons";
import { Drawer, Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";

import CreateTaskForm from "components/CreateTaskForm/CreateTaskForm";
import { TaskProjectAction } from "store/TaskProject";
import { UsersAction } from "store/Users";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //sider bar
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {},
  } = theme.useToken();
  const { vsTask } = useSelector((state: RootState) => state.taskProject);
  const onClose = () => {
    dispatch(TaskProjectAction.CloseTask());
  };
  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Layout>
        <Sider
          className="lg:!h-[500vh] sm:!h-[100%]"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo-vertical" />
          <Menu
            className=" lg:!w-full sm:!w-full"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <div
              className="!text-right !pr-2 !mt-1"
              onClick={() => setCollapsed(!collapsed)}
            >
              <BarsOutlined
                style={{ color: "white", cursor: "pointer", fontSize: "20px" }}
              />
            </div>
            <Menu.Item
              key="1"
              icon={
                <i className="fa-solid fa-magnifying-glass text-[rgb(222,235,255)] hover:text-[#ffff] lg:!text-[20px] sm:!text-[15px]"></i>
              }
            >
              Sreach issues
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                dispatch(TaskProjectAction.OpenTask());
              }}
              key="2"
              icon={
                <i className="fa-solid fa-plus text-[rgb(222,235,255)] hover:text-[#ffff] lg:!text-[20px] sm:!text-[15px]"></i>
              }
            >
              Create issues
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                dispatch(UsersAction.logout);
                navigate("/");
              }}
              key="3"
              icon={
                <i className="fa-solid fa-right-from-bracket text-[rgb(222,235,255)] hover:text-[#ffff] lg:!text-[20px] sm:!text-[15px]"></i>
              }
            >
              Log Out
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
      {/* MENU */}
      <div className=" lg:w-[17.5rem] sm:w-[15rem] bg-[#f4f5f7]">
        <SideMenu />
      </div>
      {/* Drawer of createIssues */}
      <Drawer
        placement="left"
        title="Create Task"
        width={720}
        onClose={onClose}
        visible={vsTask}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <CreateTaskForm />
      </Drawer>
    </div>
  );
};

export default SideBar;

import {
  AutoComplete,
  Avatar,
  Button,
  Drawer,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table/interface";

import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons/lib/icons";
import { AllProjcet } from "types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { useEffect, useRef, useState } from "react";
import {
  AssignProjectThunk,
  CreateProjectAction,
  DeleteProjectThunk,
  DeleteUserProjectThunk,
  GetAllProjectThunk,
} from "store/CreateProject";
import { EditProjectForm } from "components/EditProjectForm/EditProjectForm";
import { toast } from "react-toastify";
import { GetUserThunk } from "store/Users";
import { NavLink } from "react-router-dom";

export const ManagerTable = () => {
  const onClose = () => {
    dispatch(CreateProjectAction.CloseDrawer());
  };

  const { project, visible } = useSelector(
    (state: RootState) => state.createProject
  );

  const { userSearch } = useSelector((state: RootState) => state.users);
  const [value, setValue] = useState("");
  const searchRef = useRef(null);

  const handleDetelet = async (value) => {
    try {
      await dispatch(DeleteProjectThunk(value));
      toast.success("Đã xóa thành công");
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetAllProjectThunk());
  }, []);
  const columns: ColumnsType<AllProjcet> = [
    {
      title: "Project ID",
      dataIndex: "id",
      key: "id",
      sorter: (id1, id2) => {
        return id2.id - id1.id;
      },
      sortDirections: ["descend"],
    },

    {
      title: "project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record) => {
        const id = record.id;
        return <NavLink to={`/ProjectDetail/${id}`}>{text}</NavLink>;
      },
      sorter: (item1, item2) => {
        const Pr1 = item1.projectName?.trim().toLowerCase();
        const Pr2 = item2.projectName?.trim().toLowerCase();
        if (Pr2 < Pr1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },

    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item1, item2) => {
        const Pr1 = item1.categoryId;
        const Pr2 = item2.categoryId;
        if (Pr2 < Pr1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "creator",
      key: "creator",
      render: (record) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item1, item2) => {
        const Pr1 = item1.creator?.name.trim().toLowerCase();
        const Pr2 = item2.creator?.name.trim().toLowerCase();
        if (Pr2 < Pr1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "members",
      key: "members",
      render: (record) => (
        <div>
          {record.members?.slice(0, 3).map((member, index) => {
            return (
              <Popover
                key={index}
                placement="top"
                title={"Members"}
                content={() => {
                  return (
                    <table className="min-w-full ">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Id
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            avatar
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            name
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            thao tac
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.members?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="py-2 px-4 border-b border-gray-200">
                                {item.userId}
                              </td>
                              <td className="py-2 px-4 border-b border-gray-200">
                                <img
                                  className="!w-[25px] rounded-xl"
                                  src={item.avatar}
                                  alt=""
                                />
                              </td>
                              <td className="py-2 px-4 border-b border-gray-200">
                                {item.name}
                              </td>
                              <td className="py-2 px-4 border-b border-gray-200">
                                <button
                                  className="bg-red-400 w-8 h-6 rounded-2xl"
                                  onClick={() => {
                                    dispatch(
                                      DeleteUserProjectThunk({
                                        userId: item.userId,
                                        projectId: record.id,
                                      })
                                    );
                                  }}
                                >
                                  <DeleteOutlined className="  !text-white" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  );
                }}
              >
                <Avatar
                  key={index}
                  src={<img src={member.avatar} alt="avatar" />}
                />
              </Popover>
            );
          })}
          {record.members?.length > 3 ? <Avatar>...</Avatar> : " "}
          <Popover
            placement="rightTop"
            title={"Add user"}
            content={() => {
              return (
                <AutoComplete
                  options={userSearch?.map((user) => ({
                    label: user.name,
                    value: user.userId.toString(),
                  }))}
                  value={value}
                  onChange={(text) => {
                    setValue(text);
                  }}
                  onSelect={(valueSelect, option) => {
                    setValue(option.label);
                    dispatch(
                      AssignProjectThunk({
                        projectId: record.id,
                        userId: +valueSelect,
                      })
                    );
                  }}
                  style={{ width: 200 }}
                  onSearch={(value: string) => {
                    if (searchRef.current) {
                      clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                      dispatch(GetUserThunk(value));
                    }, 300);
                  }}
                />
              );
            }}
            trigger="click"
          >
            <Button className="!rounded-[100% ] ">+</Button>
          </Popover>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            onClick={() => {
              dispatch(CreateProjectAction.EditProject(record));
            }}
          >
            <EditOutlined className="!text-[1.25rem]" />
          </button>
          <button type="button" onClick={() => handleDetelet(record.id)}>
            <DeleteOutlined className="!text-[1.25rem] !text-red-600" />
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div className="mt-8">
      <Table
        className="!w-[62.5rem] lg:!w-[62.5rem]"
        columns={columns}
        dataSource={project}
        rowKey={"id"}
      />
      {/* Drawer of createIssues */}
      <Drawer
        title="Edit Project"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <EditProjectForm />
      </Drawer>
    </div>
  );
};

export default ManagerTable;

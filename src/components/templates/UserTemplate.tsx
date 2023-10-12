import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { useEffect, useState } from "react";
import { DeleteUsersThunk, GetUserThunk, UsersAction } from "store/Users";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import EditUser from "components/EditUser/EditUser";
export const UserTemplate = () => {
  const dispatch = useAppDispatch();
  const { userSearch, ModalEdit } = useSelector(
    (state: RootState) => state.users
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onCancel = () => {
    dispatch(UsersAction.CloseModal());
  };
  useEffect(() => {
    dispatch(GetUserThunk(""));
  }, []);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchChange = () => {
    dispatch(GetUserThunk(searchTerm));
  };
  return (
    <div>
      <div className="ml-10">
        <h1 className="mt-10 text-3xl font-semibold">User management</h1>
      </div>
      <div className="mt-4 ml-10">
        <div>
          <input
            className=" pl-2 w-[300px] h-[35px] border-2 "
            type="search"
            placeholder="Search..."
            onChange={handleInputChange}
          />
          <button
            onClick={handleSearchChange}
            className="ml-2 bg-blue-500 px-2 py-1 rounded-2xl"
          >
            <i className="fa-solid fa-magnifying-glass text-[rgba(255,255,255,0.7)] hover:text-black"></i>
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">avatar</th>
              <th className="py-2 px-4 border-b border-gray-200">name</th>
              <th className="py-2 px-4 border-b border-gray-200">email</th>
              <th className="py-2 px-4 border-b border-gray-200">Phone</th>
              <th className="py-2 px-4 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {userSearch?.map((us, index) => {
              if (
                searchTerm &&
                us?.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return (
                  <tr key={index}>
                    <td className="py-2 px-8 border-b border-gray-200">
                      <img
                        className="!w-[35px] rounded-xl"
                        src={us.avatar}
                        alt=""
                      />
                    </td>
                    <td className="py-2 px-8 border-b border-gray-200">
                      {us.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {us.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {us.phoneNumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => {
                          dispatch(UsersAction.editUser(us));
                        }}
                        type="button"
                      >
                        <EditOutlined className="!text-[1.25rem]" />
                      </button>
                      <button className="ml-3" type="button">
                        <DeleteOutlined
                          onClick={async () => {
                            await dispatch(DeleteUsersThunk(us.userId));
                            await dispatch(GetUserThunk(""));
                          }}
                          className="!text-[1.25rem] !text-red-600"
                        />
                      </button>
                    </td>
                  </tr>
                );
              } else if (!searchTerm) {
                return (
                  <tr key={index}>
                    <td className="py-2 px-8 border-b border-gray-200">
                      <img
                        className="!w-[35px] rounded-xl"
                        src={us.avatar}
                        alt=""
                      />
                    </td>
                    <td className="py-2 px-8 border-b border-gray-200">
                      {us.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {us.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {us.phoneNumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => {
                          dispatch(UsersAction.editUser(us));
                        }}
                        type="button"
                      >
                        <EditOutlined className="!text-[1.25rem]" />
                      </button>
                      <button className="ml-3" type="button">
                        <DeleteOutlined
                          onClick={async () => {
                            await dispatch(DeleteUsersThunk(us.userId));
                            await dispatch(GetUserThunk(""));
                          }}
                          className="!text-[1.25rem] !text-red-600"
                        />
                      </button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
      <Modal visible={ModalEdit} onCancel={onCancel} width={1000} footer={null}>
        <EditUser />
      </Modal>
    </div>
  );
};

export default UserTemplate;

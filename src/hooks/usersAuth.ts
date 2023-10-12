import { useSelector } from "react-redux";
import { RootState } from "store";

export const usersAuth = () => {
  const { user } = useSelector((state: RootState) => state.users);
  return { user };
};
export const projectAuth = () => {};

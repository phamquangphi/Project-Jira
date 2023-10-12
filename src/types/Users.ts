export type Users = {
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
  accessToken?: string;
};
export type Getuser = {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
};
export type editUser = {
  id: number;
  passWord: string;
  email: string;
  name: string;
  phoneNumber: string;
};

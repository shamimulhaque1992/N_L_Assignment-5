export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUserData;
};
export interface IUserData {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "UNBAN" | "BAN";
  createdAt: string;
  updatedAt: string;
  profile: IProfile;
}
export interface IProfile {
  id: string;
  avatar: string;
  bio: string;
  phone: string;
  userId: string;
  createAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    token: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

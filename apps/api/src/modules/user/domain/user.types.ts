export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface UserEntity {
  id: string;

  name: string;

  email: string;

  password: string;

  role: UserRole;

  createdAt: Date;

  updatedAt: Date;
}

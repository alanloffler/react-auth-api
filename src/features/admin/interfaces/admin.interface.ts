export interface IAdmin {
  createdAt: string;
  deletedAt?: string;
  email: string;
  firstName: string;
  ic: string;
  id: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  role: IRole;
  roleId: string;
  updatedAt: string;
  userName: string;
}

interface IRole {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
  value: string;
}

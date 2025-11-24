export interface IAdmin {
  id: string;
  ic: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: IRole;
  createdAt: string;
  updatedAt: string;
}

interface IRole {
  id: string;
  name: string;
  value: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

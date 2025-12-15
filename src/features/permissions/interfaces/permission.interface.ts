export interface IPermission {
  actionKey: string;
  category: string;
  createdAt: string;
  deletedAt?: string;
  description: string;
  id: string;
  name: string;
  updatedAt: Date;
}

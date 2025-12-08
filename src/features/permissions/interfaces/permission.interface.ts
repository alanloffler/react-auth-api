export interface IPermission {
  actionKey: string;
  category: string;
  createdAt: Date;
  deletedAt?: Date;
  description: string;
  id: string;
  name: string;
  updatedAt: Date;
}

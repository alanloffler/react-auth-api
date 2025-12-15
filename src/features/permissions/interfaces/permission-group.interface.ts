export interface IPermissionGroup {
  actions: IPermissionAction[];
  id: string;
  module: string;
  name: string;
}

interface IPermissionAction {
  deletedAt?: string;
  id: string;
  key: string;
  name: string;
  value: boolean;
}

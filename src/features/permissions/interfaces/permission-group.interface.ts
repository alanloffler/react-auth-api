export interface IPermissionGroup {
  actions: IPermissionAction[];
  id: string;
  module: string;
  name: string;
}

interface IPermissionAction {
  id: string;
  key: string;
  name: string;
  value: boolean;
}

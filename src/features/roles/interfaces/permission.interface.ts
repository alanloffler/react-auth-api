export interface IPermission {
  id: number;
  name: string;
  module: string;
  actions: IAction[];
}

interface IAction {
  id: number;
  name: string;
  key: string;
  value: boolean;
}

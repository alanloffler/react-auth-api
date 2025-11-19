export interface IApiResponse<T = unknown> {
  data?: T;
  message: string;
  statusCode: number;
}

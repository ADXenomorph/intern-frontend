export interface Response<T> {
  status: number;
  message: string;
  payload: T;
}

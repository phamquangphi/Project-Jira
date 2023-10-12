declare type ApiRespone<T> = {
  statusCode: number;
  message: string;
  content: T;
};
declare type TitleRespone<T> = {
  statusCode: number;
  content: T;
};

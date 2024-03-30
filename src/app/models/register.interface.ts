export interface IRegisterResponse {
  id: string;
  email: string;
  username: string;
}

export interface IRegisterRequest {
  email: string;
  username: string;
  password: string;
}

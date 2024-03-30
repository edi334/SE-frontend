export interface ILoginResponse {
  token: string;
  message: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

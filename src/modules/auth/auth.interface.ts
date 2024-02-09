export interface IPayloadToken {
  sub: string;
  ID: number;
  username: string;
//   email: string;
  role: {
    _id: string;
    // name: string;
  };
  iat?: number;
  exp?: number;
}

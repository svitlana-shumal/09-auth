export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SessionResponse = {
  accessToken: string;
  refreshToken?: string;
};

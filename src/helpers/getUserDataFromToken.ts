import jwt_decode from 'jwt-decode';

type TokenDecoded = {
  login: string;
  userId: string;
};

export const getUserDataFromToken = (token: string): TokenDecoded => {
  return jwt_decode(token);
};

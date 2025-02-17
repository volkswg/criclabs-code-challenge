import jwt from 'jsonwebtoken';

const accessTokenSecret = 'AccessToken$ecret';
const signToken = (data: Record<string, string>, secretKey: string) =>
  jwt.sign(data, secretKey);

export const signAccessToken = (data: Record<string, string>) =>
  signToken(data, accessTokenSecret);

export const verifyAccessToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, decode) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decode);
    });
  });

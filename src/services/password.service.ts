import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const checkPassword = async (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);

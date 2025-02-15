import { UnauthorizedError } from '@/exceptions/unauthorized-error';
import { ProcessedParams } from '@/middlewares/request.middleware';
import { withMiddleware } from '@/middlewares/router.middleware';
import { signAccessToken } from '@/services/auth-token.service';
import { serializeCookie } from '@/services/cookies.service';
import { checkPassword } from '@/services/password.service';
import { findUserByEmail } from '@/services/users.service';

interface LoginBody {
  email: string;
  password: string;
}

const loginHandler = async (params: ProcessedParams) => {
  const { email, password } = params.body as LoginBody;
  const user = await findUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }
  const isPasswordMatch = await checkPassword(password, user.password);
  if (!isPasswordMatch) {
    throw new UnauthorizedError('Invalid email or password');
  }
  // generate jwt token
  const accessToken = signAccessToken({ email: user.email });

  // const result = await createUsers({
  //   email,
  //   password: hashedPassword,
  // });
  // console.log(result);

  const cookie = serializeCookie('accessToken', accessToken, {
    httpOnly: true, // Prevent client-side JS from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
    maxAge: 3600, // 1 hour in seconds
    sameSite: 'strict', // Prevent CSRF attacks
    path: '/', // Make the cookie accessible across the entire site
  });

  return new Response(
    JSON.stringify({ message: 'Login successful', accessToken }),
    {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const POST = withMiddleware(loginHandler);

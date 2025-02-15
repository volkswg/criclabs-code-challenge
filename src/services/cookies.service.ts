import { NextRequest } from 'next/server';
import { serialize, SerializeOptions } from 'cookie';

export const serializeCookie = (
  name: string,
  data: string,
  option: SerializeOptions
) => serialize(name, data, option);

export const getCookies = (
  cookies: NextRequest['cookies'],
  cookieName: string
) => cookies.get(cookieName);

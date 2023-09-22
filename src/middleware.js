import { NextResponse } from 'next/server';
/* import axios from '@/lib/axios';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  //console.log(request.url);
  const permissions = get_permissions(request.url);
  console.log(permissions);
  if (permissions.perms) {
    return NextResponse.next();
    //return NextResponse.redirect(new URL('/', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/about',
    '/calendario',
    '/trainers',
    '/trainers/:path*',
  ],
}

const get_permissions = (url) => {
  axios
    .get('/api/permissions?url=' + url)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    })
} */

export default function middleware(request) {
  /* const token = request.cookies.get('token')?.value;
  const signInUrl = new URL('/', request.nextUrl);

  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: [
    '/',
    '/calendario',
    '/trainers',
  ] */
}
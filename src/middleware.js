import { NextResponse } from "next/server";
import { cookies } from "next/headers";
/* import axios from '@/lib/axios';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  //console.log(request.url);
  /* const permissions = get_permissions(request.url);
  console.log(permissions);
  if (permissions.perms) {
    return NextResponse.next();
    //return NextResponse.redirect(new URL('/', request.url));
  } */

// See "Matching Paths" below to learn more
/* export const config = {
  matcher: ["/about", "/trainers", "/trainers/:path*"],
}; */

const get_permissions = async (url_request) => {
  /* axios
    .get('/api/permissions?url=' + url)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    }) */
  //const cookiesList = await cookies();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/permissions?url=" + url_request;
  const res = fetch(url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return "error";
  }
  return res.json();
};

export default async function middleware(request) {
  console.log(request);
  const {pathname} = request.nextUrl;
  const data = await get_permissions(pathname);
  if (data.perms) {
    return NextResponse.redirect(new URL("/prueba", request.url));
  } else {
    return NextResponse.next();
  }

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

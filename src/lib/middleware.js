import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}

const get_permissions = async()=>{
    axios
      .get('/api/permissions')
      .then(res => {return res.data})
      .catch(error => {
        return error
      })
}
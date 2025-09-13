import { defineMiddleware } from 'astro:middleware';
import jwt from 'jsonwebtoken';

const protectedAdminRoutes = ['/admin/dashboard', '/admin/new', '/admin/edit'];
const protectedApiRoutes = [
    { path: /^\/api\/posts$/, methods: ['POST'] },
    { path: /^\/api\/posts\/\d+$/, methods: ['PUT', 'DELETE'] },
];

export const onRequest = defineMiddleware(async ({ url, request, cookies, redirect }, next) => {
  const pathname = url.pathname;

  const isProtectedAdminRoute = protectedAdminRoutes.some(route => pathname.startsWith(route));
  
  let isProtectedApiRoute = false;
  for (const route of protectedApiRoutes) {
    if (route.path.test(pathname) && route.methods.includes(request.method)) {
      isProtectedApiRoute = true;
      break;
    }
  }

  if (isProtectedAdminRoute || isProtectedApiRoute) {
    const token = cookies.get('auth-token')?.value;

    if (!token) {
      if (isProtectedApiRoute) return new Response('Unauthorized', { status: 401 });
      return redirect('/admin');
    }

    try {
      jwt.verify(token, import.meta.env.JWT_SECRET);
    } catch (error) {
      if (isProtectedApiRoute) return new Response('Unauthorized', { status: 401 });
      return redirect('/admin');
    }
  }

  return next();
});

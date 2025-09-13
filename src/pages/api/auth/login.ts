import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { password } = await request.json();

  if (password === import.meta.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ user: 'admin' }, import.meta.env.JWT_SECRET, { expiresIn: '8h' });
    cookies.set('auth-token', token, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      maxAge: 8 * 60 * 60,
      path: '/',
    });
    return new Response(JSON.stringify({ message: 'Logged in' }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }
};

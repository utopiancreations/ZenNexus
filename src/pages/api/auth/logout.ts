import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('auth-token', { path: '/' });
  return redirect('/admin');
};

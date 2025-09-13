import type { APIRoute } from 'astro';
import { getAllPillars, createPillar } from '../../../../db/lib';

const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export const GET: APIRoute = async () => {
  const pillars = await getAllPillars();
  return new Response(JSON.stringify(pillars), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { title, content, excerpt } = await request.json();
  const slug = slugify(title);

  if (!title || !content) {
    return new Response(JSON.stringify({ message: 'Title and content are required' }), { status: 400 });
  }

  const pillar = await createPillar(title, slug, content, excerpt);

  return new Response(JSON.stringify(pillar), {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

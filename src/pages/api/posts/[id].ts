import type { APIRoute } from 'astro';
import { getPillarById, updatePillar, deletePillar } from '../../../../db/lib';

export const GET: APIRoute = async ({ params }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid ID' }), { status: 400 });
  }

  const pillar = await getPillarById(id);
  if (!pillar) {
    return new Response(JSON.stringify({ message: 'Pillar not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(pillar), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid ID' }), { status: 400 });
  }

  const { title, content, excerpt } = await request.json();
  if (!title || !content) {
    return new Response(JSON.stringify({ message: 'Title and content are required' }), { status: 400 });
  }

  const pillar = await updatePillar(id, title, content, excerpt);

  return new Response(JSON.stringify(pillar), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid ID' }), { status: 400 });
  }

  await deletePillar(id);

  return new Response(null, {
    status: 204
  });
};

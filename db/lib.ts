import postgres from 'postgres';

const sql = postgres(import.meta.env.POSTGRES_URL, { ssl: 'require' });

export async function getAllPillars() {
  return await sql`SELECT * FROM pillars`;
}

export async function getPillarBySlug(slug: string) {
  const pillars = await sql`SELECT * FROM pillars WHERE slug = ${slug}`;
  return pillars[0];
}

export async function getPillarById(id: number) {
  const pillars = await sql`SELECT * FROM pillars WHERE id = ${id}`;
  return pillars[0];
}

export async function createPillar(title: string, slug: string, content: string, excerpt: string) {
  const pillars = await sql`
    INSERT INTO pillars (title, slug, content, excerpt)
    VALUES (${title}, ${slug}, ${content}, ${excerpt})
    RETURNING *
  `;
  return pillars[0];
}

export async function updatePillar(id: number, title: string, content: string, excerpt: string) {
  const pillars = await sql`
    UPDATE pillars
    SET title = ${title}, content = ${content}, excerpt = ${excerpt}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return pillars[0];
}

export async function deletePillar(id: number) {
  await sql`
    DELETE FROM pillars
    WHERE id = ${id}
  `;
}

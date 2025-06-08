const db = require('./config');

exports.getProjects = async () => {
  const query = `
    SELECT id, title, description, 
           ARRAY(SELECT unnest(technologies)) AS technologies,
           image_url, github_url, live_url,
           CASE WHEN featured THEN 1 ELSE 2 END AS sort_order
    FROM projects
    ORDER BY sort_order, created_at DESC
  `;
  const { rows } = await db.query(query);
  return rows;
};
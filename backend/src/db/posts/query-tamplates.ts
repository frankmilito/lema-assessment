export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

export const addPostTemplate = `
INSERT INTO posts (id, user_id, title, body, created_at) VALUES (?, ?, ?, ?, DATETIME('now'));
`;

export const removePostTemplate = `
DELETE
FROM posts
WHERE id = ? AND user_id = ?
`;

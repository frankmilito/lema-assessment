export const selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;

export const selectUsersWithAddressTemplate = `
SELECT 
  u.*, 
  a.street, 
  a.city, 
  a.state, 
  a.zipcode
FROM 
  users u
LEFT JOIN 
  addresses a
ON 
  u.id = a.user_id
ORDER BY 
  u.name 
LIMIT ?, ?;
`;

export const selectAddressByUserIdTemplate = `
SELECT 
  street, city, state, zip 
FROM 
  addresses 
WHERE 
  user_id = ?;
`;

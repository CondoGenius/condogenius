SELECT u.email as UserName, r.name as Role FROM users as u
INNER JOIN roles as r
ON u.role_id = r.id
WHERE u.email = @Email AND u.password = @Password AND u.is_active = 1;
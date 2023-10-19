SELECT id as Id, name as Name, cpf as Cpf, reserve_id as ReserveId, created_at as CreatedAt
FROM guest_list 
WHERE reserve_id = @ReserveId and name != '';

SELECT id, name, phone, cpf, reserve_id, created_at
FROM guest_list
WHERE reserve_id = @ReserveId;

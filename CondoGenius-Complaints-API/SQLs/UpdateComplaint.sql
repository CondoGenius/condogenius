UPDATE complaints
SET description = @Description,
    status      = @Status
WHERE id = @Id;

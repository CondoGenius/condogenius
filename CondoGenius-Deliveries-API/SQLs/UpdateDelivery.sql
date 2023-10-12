UPDATE delivery_control
SET status      = @Status,
    received_by = @ReceivedBy,
    received_at = NOW(),
    updated_at  = NOW()
WHERE id = @Id;
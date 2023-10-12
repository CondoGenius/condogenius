UPDATE delivery_control
SET status      = 'Entregue',
    received_at = NOW(),
    updated_at  = NOW()
WHERE id = @Id;
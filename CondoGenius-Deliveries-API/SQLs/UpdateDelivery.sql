UPDATE delivery_control
SET status      = 'Entregue',
    delivered_at = NOW(),
    updated_at  = NOW()
WHERE id = @Id;
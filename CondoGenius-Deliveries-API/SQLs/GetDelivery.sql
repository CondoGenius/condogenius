SELECT delivery.id           as Id,
       delivery.status       as Status,
       delivery.delivered_at as DeliveredAt,
       delivery.received_at  as ReceivedAt,
       delivery.received_by  as ReceivedBy,
       delivery.created_at   as CreatedAt,
       delivery.updated_at   as UpdatedAt,
       resident.id           as ResidentId,
       resident.residence_id as ResidenceId,
       resident.email        as ResidentEmail
FROM delivery_control delivery
         INNER JOIN residents resident ON delivery.resident_id = resident.id
WHERE delivery.id = @Id;
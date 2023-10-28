SELECT delivery.id           as Id,
       delivery.status       as Status,
       delivery.delivered_at as DeliveredAt,
       delivery.received_at  as ReceivedAt,
       delivery.created_at   as CreatedAt,
       delivery.updated_at   as UpdatedAt,
       residence.id          as ResidenceId,
       adm.name              as AdminName,
       adm.last_name         as AdminLastName,
       adm.email             as AdminEmail
FROM delivery_control delivery
         INNER JOIN residences residence ON delivery.residence_id = residence.id
         INNER JOIN administrators adm ON delivery.user_id = adm.id
WHERE delivery.id = @Id;
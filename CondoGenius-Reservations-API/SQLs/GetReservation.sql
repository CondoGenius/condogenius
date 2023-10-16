SELECT r.id            AS Id,
       r.resident_id   AS ResidentId,
       r.reserve_date  AS ReserveDate,
       r.created_at    AS CreatedAt,
       ca.name       AS CommonAreaName
FROM reserve_common_area r
         INNER JOIN common_area ca ON r.common_area_id = ca.id
WHERE r.id = @Id
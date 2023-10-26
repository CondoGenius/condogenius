SELECT r.id                               AS Id,
       r.resident_id                      AS ResidentId,
       CONCAT(r2.name, ' ', r2.last_name) AS ResidentName,
       r.reserve_date                     AS ReserveDate,
       r.created_at                       AS CreatedAt,
       ca.name                            AS CommonAreaName
FROM reserve_common_area r
         INNER JOIN common_area ca ON r.common_area_id = ca.id
         INNER JOIN residents r2 on r.resident_id = r2.id
ORDER BY r.created_at DESC;

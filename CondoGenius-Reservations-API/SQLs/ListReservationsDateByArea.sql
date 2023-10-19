SELECT r.reserve_date AS ReserveDate
FROM reserve_common_area r
WHERE common_area_id = @Id
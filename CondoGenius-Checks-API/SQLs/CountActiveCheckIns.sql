SELECT COUNT(c.created_at) as ActiveCheckIns, ifnull(ca.capacity, 1000) as Capacity
FROM check_in_common_area c
         INNER JOIN common_area ca on c.common_area_id = ca.id
WHERE c.common_area_id = 4;
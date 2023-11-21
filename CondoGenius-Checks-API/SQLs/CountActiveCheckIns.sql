SELECT COUNT(c.created_at) as ActiveCheckIns, (SELECT capacity FROM common_area where id = 4) as Capacity
FROM check_in_common_area c
         INNER JOIN common_area ca on c.common_area_id = ca.id
WHERE c.common_area_id = 4;
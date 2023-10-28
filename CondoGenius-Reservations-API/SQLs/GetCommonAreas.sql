SELECT
    id AS Id,
    name AS Name,
    capacity AS Capacity,
    business_hour AS BusinessHour,
    is_active AS IsActive,
    image AS Image
FROM common_area
WHERE name not like '%Academia%';

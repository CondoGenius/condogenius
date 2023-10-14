SELECT c.id          AS Id,
       c.description AS Description,
       c.status      AS Status,
       r.name        AS Name,
       r.last_name   AS LastName,
       rs.number     AS Number,
       rs.floor      AS Floor,
       rs.block      AS Block
FROM complaints c
         INNER JOIN residents r ON c.resident_id = r.id
         INNER JOIN residences rs ON c.residence_to_complaint_id = rs.id
WHERE c.id = @Id;

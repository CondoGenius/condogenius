SELECT c.id          AS Id,
       c.description AS Description,
       c.status      AS Status,
       r.name        AS ResidentName,
       r.last_name   AS ResidentLastName,
       rs.number     AS ResidenceNumber,
       rs.floor      AS Floor,
       rs.block      AS Block,
       c.created_at  AS Date
FROM complaints c
         INNER JOIN residents r ON c.resident_id = r.id
         INNER JOIN residences rs ON c.residence_to_complaint_id = rs.id;

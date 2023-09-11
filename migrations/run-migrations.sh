#!/bin/bash

for migration_script in ./migrations/*.sql; do
    docker-compose exec condogenius-api_mysql_1 mysql -u root -p -D genius < "$migration_script"
done

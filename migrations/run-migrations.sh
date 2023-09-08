#!/bin/bash

for migration_script in ./migrations/*.sql; do
    docker-compose exec condogenius-api_mysql_1 psql -U root -d genius -f "$migration_script"
done

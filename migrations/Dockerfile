# Use a mesma imagem base que o serviço mysql
FROM mysql

# Copie o script de migração para o contêiner
# COPY ./migrations/run-migrations.sh /docker-entrypoint-initdb.d/
# COPY . /docker-entrypoint-initdb.d/
COPY . .

# Defina as variáveis de ambiente necessárias (se aplicável)
ENV MYSQL_ROOT_PASSWORD=genius
ENV MYSQL_DATABASE=genius

# Execute o script de migração no início do contêiner
CMD ["mysqld"]

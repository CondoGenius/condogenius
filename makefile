SHELL:=/bin/bash

# 
# adicionamos os comandos de build de cada api
# cd CondoGenius-Api && yarn
# cd CondoGenius-GatewayApi && yarn

up:
	sudo docker-compose up

up-build:
	sudo docker-compose up --build

# comando para derrubar todos os serviços
down-all:
	sudo docker stop CondoGenius-mysql_1 CondoGenius-gateway_1 CondoGenius-residents_1

# comando para remover todas os serviços 
rm-all:
	sudo docker rm CondoGenius-mysql_1 CondoGenius-gateway_1 CondoGenius-residents_1
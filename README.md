# CondoGenius 💻
Aplicação orientada à microserviços que sustenta o software CondoGenius - software para condomínios.

# Estrutura ⚙️

![alt](https://github.com/CondoGenius/condogenius-api/blob/add-readme/CondoGenius%20arquitetura.jpg)

## Microservices disponíveis 🌐
Nome | Porta
---- | ----
CondoGeniuis-WEB | (porta: 3000)
API-Auth/Gateway | (porta: 5000)
API-Complains | (porta: 7002)
API-Deliveries | (porta: 7003)
API-DigitalHub | (porta: 7004)
API-SendNotifications | (porta: 7007)
API-Residents | (porta: 7008)

## Dependências 🛠️

- [Node.js](https://nodejs.org/en/) 14.16.1
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Docker](https://docs.docker.com/install/)

## Configurações local 👨🏻‍💻

1. Clone esse repositório executando `git clone https://github.com/CondoGenius/condogenius`
2. No caminho diretório do repositório, execute o comando `make up-build` (ou docker-compose up --build).
3. O comando `make up` levanta alguns containers com o docker-compose:

## Rodando os testes


---

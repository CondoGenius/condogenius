# Usa uma imagem base do Node.js
FROM node:14-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Compila o projeto React
RUN npm run build

# Define a porta em que o aplicativo irá rodar dentro do contêiner
EXPOSE 3000

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD [ "npm", "start" ]

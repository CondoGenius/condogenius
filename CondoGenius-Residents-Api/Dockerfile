# Use uma imagem base do Node.js, com uma versão específica
FROM node:14

# Diretório de trabalho dentro do contêiner
WORKDIR ./

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o conteúdo do diretório de origem para o diretório de trabalho no contêiner
COPY . .

# Expõe a porta em que o microserviço irá escutar
EXPOSE 7005

# Comando para iniciar o microserviço
CMD ["npm", "start"]

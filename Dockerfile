# Basis-Image für Node.js Microservice
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# SICHERHEITSRISIKO: Container läuft als root User
USER root

EXPOSE 3000

CMD ["node", "dist/server.js"]

FROM node:lts-slim

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
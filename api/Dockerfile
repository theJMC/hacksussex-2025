FROM node:20
EXPOSE 3001

WORKDIR /app

COPY package.json /app/package.json

RUN npm i

COPY . /app

CMD ["npm", "run", "prod"]
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm ci
RUN npm build

CMD [ "npm", "start" ]

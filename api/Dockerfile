FROM node:20-alpine

WORKDIR /app

COPY deno*.json ./

RUN deno install

COPY .env .
COPY . .

RUN deno task build

CMD [ "deno", "task", "start:prod" ] 
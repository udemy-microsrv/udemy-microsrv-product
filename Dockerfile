FROM node:22-alpine3.21

ENV DATABASE_URL="file:./dev.db"
ENV NATS_SERVERS="nats://localhost:4222"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev

CMD ["npm", "run", "start:dev"]

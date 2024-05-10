# sorry for one-stage build and not compiling TS to JS, but I guess it's fine for our purposes
FROM --platform=linux/amd64 node:20-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

CMD [ "pnpm", "start" ]

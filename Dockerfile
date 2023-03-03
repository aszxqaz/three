FROM node:16-alpine
WORKDIR /app
COPY dist .
COPY package.json .
CMD [ "npm", "run", "start:docker" ]
FROM node
WORKDIR /app
COPY dist dist
COPY package.json .
CMD [ "npm", "run", "start:docker" ]
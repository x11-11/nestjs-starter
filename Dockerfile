FROM node:alpine

WORKDIR /usr/src

COPY package* .
RUN npm i
COPY . . 
RUN npm run test
RUN npm run build

CMD [ "npm", "start" ]
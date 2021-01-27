FROM node:alpine

RUN apk add --update --no-cache bash

WORKDIR /usr/app

COPY *.json ./

RUN npm i

COPY . .

# This weirdness is to stop the console clearing behaviour https://github.com/facebook/create-react-app/issues/7640
ENV COLOR=1
CMD [ "/bin/bash", "-c", "npm start | cat" ]
FROM node:10-alpine

ADD package.json package-lock.json /webapp/

WORKDIR /webapp
RUN apk add --no-cache git openssh-client
RUN npm ci && npm cache clean --force

ADD . /webapp/

EXPOSE 8080
ENTRYPOINT [ "npm", "start" ]

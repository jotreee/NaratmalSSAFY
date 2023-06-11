FROM node:16.18.0

WORKDIR /usr/src/app

COPY package.json ./
COPY ./ ./
RUN npm install --save --legacy-peer-deps
RUN npm run build
RUN yarn global add serve

COPY ./ ./
CMD [ "npm", "run", "start" ]

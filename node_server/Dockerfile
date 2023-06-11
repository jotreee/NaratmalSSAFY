From node:16.18.0

COPY ./ ./node_server/

WORKDIR ./node_server

RUN npm install -g ttf2woff

RUN npm install


CMD ["node", "app.js"]
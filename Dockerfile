FROM node:alpine AS ui-build
RUN npm config set registry " https://registry.npm.taobao.org "
WORKDIR /usr/src/app
COPY src/ ./src/
RUN cd src && npm install && npm run build

FROM node:alpine AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/src/build ./src/build
COPY server/ ./server/
COPY *.json ./
COPY *.js ./
RUN npm install
CMD ["npm", "start"]
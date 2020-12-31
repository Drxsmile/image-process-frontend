FROM node:alpine
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
WORKDIR /root/
COPY src/ ./src/
COPY public/ ./public/
COPY server/ ./server/
COPY *.json ./
COPY *.js ./
ENV DANGEROUSLY_DISABLE_HOST_CHECK true
RUN cnpm install && npm run build
CMD ["npm", "start"]
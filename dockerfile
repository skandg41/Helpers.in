From node:15.5.1-alpine
RUN mkdir -p /usr/src/app
COPY ./server/* /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
RUN npm run client-install
CMD node run dev

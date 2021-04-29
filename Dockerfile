FROM node

ADD ./server /server/
WORKDIR /server/
RUN ["npm", "install"]
RUN ["npm", "run", "client-install"]
EXPOSE 3000
CMD ["npm", "run", "dev"]

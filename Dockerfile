FROM node
MAINTAINER Skand
ADD ./server /server/
WORKDIR /server/
RUN ["npm", "install"]
RUN ["npm", "run", "client-install"]
CMD ["npm", "run", "dev"]

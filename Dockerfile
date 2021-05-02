FROM node
MAINTAINER Skand
LABEL co.elastic.logs/json.keys_under_root:"true" co.elastic.logs/json.overwrite_keys:"true" co.elastic.logs/json.add_error_key:"true" co.elastic.logs/json.expand_keys:"true"
EXPOSE 3000
ADD ./server /server/
ADD ./server/client/build /server/
WORKDIR /server/
RUN cp -r client/build ./ && rm -rf client
RUN ["npm", "install"]
ENTRYPOINT ["npm", "start"]
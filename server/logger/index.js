// Configure Winston
const winston = require('winston');
const {ElasticsearchTransport} = require('winston-elasticsearch');
const keys = require("../config/keys");
/*const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: {
    id: keys.elasticCloudId,
  },
  auth: {
    username: 'elastic',
    password: keys.elasticPassword
  }
})*/

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    cloud:{
      id: "observability-deployment:dXMtd2VzdDEuZ2NwLmNsb3VkLmVzLmlvJDEyZmEyMDIwNDViYTRkMzBhMzlkZjY2ZmIzMTdiZDY0JGI3YTViNGNiZGMxYTRjNjZhMjg4NzgxYzNkYzc5Yzcw"
    },
    auth: {
      username: 'elastic',
      password: 'I64Ls5LgfPqvTtJtKgo3kkVN'
    },
    log:"info"
  },
  transformer: logData => {
    return {
      "@timestamp": (new Date()).getTime(),
      severity: logData.level,
      message: `[${logData.level}] LOG Message: ${logData.message}`,
      fields: {}
    }
  }  
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "errorlogfile.log", level: 'error' }), //save errors on file
    new winston.transports.File({ filename: "infologfile.log", level: 'info' }), //save info on file
    new winston.transports.File({ filename: "warnlogfile.log", level: 'warn' }), //save warning on file
    new ElasticsearchTransport(esTransportOpts) //everything info and above goes to elastic
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ //we also log to console if we're not in production
    format: winston.format.simple()
  }));
}

module.exports = logger;
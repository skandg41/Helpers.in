const winston = require('winston')
const ecsFormat = require('@elastic/ecs-winston-format')

const logger = winston.createLogger({
  format: ecsFormat({ convertReqRes: true }), 
  transports: [
    new winston.transports.Console()
  ]
})

logger.info('hi')
logger.error('oops there is a problem', { err: new Error('boom') })
module.exports = logger;
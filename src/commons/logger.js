import newrelicFormatter from '@newrelic/winston-enricher'
import time from 'moment-timezone'
import { createLogger, format, transports } from 'winston'

import { TZ } from './constants.js'

const { combine, printf } = format
const timezoned = () => time(new Date()).tz(TZ).format('YYYY-MM-DD HH:mm:ss')

const myFormat = printf(
  ({ level, message, timestamp }) =>
    `[${timestamp}] - [${level.padEnd(5, ' ')}] - ${message}`
)

const LOG = createLogger({
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'debug',
  format: combine(
    newrelicFormatter(),
    format.timestamp({ format: timezoned }),
    myFormat
  ),
  transports: [new transports.Console()]
})

LOG.debugJSON = (message, json) => {
  if (LOG.isDebugEnabled()) {
    LOG.debug(`${message}: ${JSON.stringify(json)}`)
  }
}

LOG.error = message => {
  if (message instanceof Object) {
    LOG.log({
      level: 'error',
      message:
        JSON.stringify(message) !== '{}' ? JSON.stringify(message) : message
    })
  } else {
    LOG.log({
      level: 'error',
      message
    })
  }
}

LOG.changeLevel = level => {
  LOG.level = level.toLowerCase()
}

export default LOG

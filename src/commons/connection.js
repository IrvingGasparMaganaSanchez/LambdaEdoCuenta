import { decryptEnvVar } from './decryp'
import mongoose from 'mongoose'
import { MS_MONGODB_CERT_PATH, MS_MONGODB_URL, TEST_EXECUTE } from './constants'

import LOG from './logger'

export const createConnection = async () => {
  LOG.info(`MS_MONGODB_URL: ${MS_MONGODB_URL}`)
  LOG.info(`MS_MONGODB_CERT_PATH: ${MS_MONGODB_CERT_PATH}`)

  const mongoURI =
    TEST_EXECUTE === false
      ? await decryptEnvVar(MS_MONGODB_URL)
      : MS_MONGODB_URL
  mongoose.set('strictQuery', false)

  let options = {}

  if (MS_MONGODB_CERT_PATH) {
    //parsear el base64
    options = {
      tls: true,
      tlsCAFile: MS_MONGODB_CERT_PATH
    }
  }

  let instance = {}

  if (mongoURI) {
    instance = await mongoose.connect(mongoURI, options)
    const { connection } = instance

    connection.on('error', error => {
      LOG.error(`Error de conexión a mongodb: ${error}`)
    })
    connection.once('open', () => LOG.info('Connection Successful'))
  }

  return instance
}

export const disconnectConnection = async () => {
  await mongoose
    .disconnect()
    .then(() => {
      LOG.info('Cliente desconectado de MongoDB')
    })
    .catch(err => {
      LOG.error(`Error al desconectar el cliente de MongoDB: ${err}`)
    })
}

export default null

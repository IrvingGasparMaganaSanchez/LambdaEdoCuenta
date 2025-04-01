import { COLLECTION_NAME } from '../commons/constants.js'
import { createConnection } from '../commons/connection.js'
import LOG from '../commons/logger.js'

const insertEdoCta = async data => {
  try {
    LOG.info('Models: Iniciando el método insertEdoCta')
    LOG.info(`Colección: ${COLLECTION_NAME}`)
    const coneMongo = await createConnection()
    const insert = await coneMongo.connection.db.collection(COLLECTION_NAME)
    const dataMongo = await insert.insertMany(data)
    LOG.info('Models: Finalizando el método insertEdoCta')
    return dataMongo.insertedCount
  } catch (error) {
    LOG.error('Error Models insertEdoCta')
    LOG.error(error)
  } finally {
    return 0
  }
}

export { insertEdoCta }

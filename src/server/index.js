import LOG from '../commons/logger.js'

exports.handler = (event, context) => {
  try {
    LOG.info('LAMBDA: Iniciando Lambda EtdoCuenta')
    const { accion, body } = event
    switch (accion) {
      case 'encolar':
        LOG.info('LAMBDA: Iniciando Acción - Encolar')
        return 0
      case 'desencolar':
        LOG.info('LAMBDA: Iniciando Acción - Desencolar')
        return 0
      default:
        LOG.info('LAMBDA: EtdoCuenta, se necesita una acción para ejecutar')
        return 1
    }
  } catch (error) {
    LOG.error('Error en la Lambda EtdoCuenta')
    LOG.error(error)
    return 0
  }
}

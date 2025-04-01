import LOG from '../commons/logger.js'
import { generarPDF } from '../services/edoCuenta.js'

const handler = async (event, context) => {
    try {
        const data = {
          idCliente: '188923',
          idContrato: '1001',
          RFC: 'MASI890105',
          codigobarra: '000010000760160423'
        }

        LOG.info('GenerarPdf: Iniciando Lambda GenerarPdf')
        await generarPDF(data)
        LOG.info('GenerarPdf: Finalizando Lambda GenerarPdf')
        return 1
    } catch (error) {
        LOG.error('Error Lambda GenerarPdf')
        LOG.error(error)
        return 0
    }
}

export { handler }

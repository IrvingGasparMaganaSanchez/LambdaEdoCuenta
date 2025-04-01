import bwipjs from 'bwip-js'
import LOG from '../../commons/logger.js'

const generarCodigoBarrasBase64 = async codigo => {
  try {
    const pngBuffer = await bwipjs.toBuffer({
      bcid: 'code128', // Tipo de código de barras
      text: codigo, // Texto del código de barras
      scale: 3, // Escala del código
      height: 10, // Altura
      includetext: false, // Incluir el texto
      textxalign: 'center' // Alineación del texto
    })

    return `data:image/png;base64,${pngBuffer.toString('base64')}`
  } catch (err) {
    LOG.error('Error al generar el código de barras')
    LOG.error(err)
    return null
  }
}

export { generarCodigoBarrasBase64 }

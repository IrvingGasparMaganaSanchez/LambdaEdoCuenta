import { crearZipConPass } from './genericos/file.service.js'
import fs from 'fs/promises'
import { generarCodigoBarrasBase64 } from './genericos/codebar.service.js'
import handlebars from 'handlebars'
import { obtenerFechaHora } from './genericos/date.service.js'
import puppeteer from 'puppeteer'

import LOG from '../commons/logger.js'
import { PLANTILLA_EDOCUENTA } from '../commons/constants.js'

const generarPDF = async data => {
  let nombreArchivoZip = ''
  try {
    const templateHtml = await fs.readFile(
      `${PLANTILLA_EDOCUENTA.PATH}${PLANTILLA_EDOCUENTA.HTML}`,
      'utf8'
    )

    const imagenBase64 = await generarCodigoBarrasBase64(data.codigobarra)
    data.codebar = imagenBase64

    LOG.info(`codebar: ${data.codebar}`)

    const template = handlebars.compile(templateHtml)
    const finalHtml = template(data)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setContent(finalHtml, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('img[alt="Código de Barras"]', { visible: true })

    // Agregar CSS externo
    await page.addStyleTag({
      path: `${PLANTILLA_EDOCUENTA.PATH}${PLANTILLA_EDOCUENTA.CSS}`
    })

    const date = obtenerFechaHora()
    const nombreArchivoPdf = `${data.idContrato}${data.idCliente}EC${date}.pdf`
    nombreArchivoZip = `${data.idContrato}${data.idCliente}EC${date}.zip`

    await page.pdf({
      path: nombreArchivoPdf,
      format: 'A4',
      printBackground: true
    })

    await crearZipConPass(nombreArchivoZip, nombreArchivoPdf, data.RFC)
    //await borrarArchivo(nombreArchivoPdf)

    await browser.close()
    LOG.info(`PDF generado correctamente`)
  } catch (error) {
    LOG.error('Error Lambda generarPDF')
    LOG.error(error)
  } 
  return nombreArchivoZip
}

const borrarArchivo = async filePath => {
  try {
    await fs.unlink(filePath)
    console.log(`Archivo borrado: ${filePath}`)
  } catch (error) {
    LOG.error('Error al borrar el archivo')
    LOG.error(error)
  }
}

export { generarPDF }

export default null

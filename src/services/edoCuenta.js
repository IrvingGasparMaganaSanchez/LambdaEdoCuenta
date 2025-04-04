import { crearZipConPass } from './genericos/file.service.js'
import fs from 'fs/promises'
import { generarCodigoBarrasBase64 } from './genericos/codebar.service.js'
import handlebars from 'handlebars'
import { insertEdoCta } from '../models/collecionEdoCta.js'
import { obtenerFechaHora } from './genericos/date.service.js'
import puppeteer from 'puppeteer'

import LOG from '../commons/logger.js'
import { TEMPLATE_AVISO_PRIVACIDAD, PLANTILLA_EDOCUENTA  } from '../commons/constants.js'

const generarPDF = async data => {
  let nombreArchivoZip = ''
  try {
    let templateBodyHtml = await fs.readFile(
      `${PLANTILLA_EDOCUENTA.PATH}${PLANTILLA_EDOCUENTA.HTMLBody}`,
      'utf8'
    )

    let templateFooterHtml = await fs.readFile(
      `${PLANTILLA_EDOCUENTA.PATH}${PLANTILLA_EDOCUENTA.HTMLFooter}`,
      'utf8'
    )

    data.logo = await fs.readFile(`${PLANTILLA_EDOCUENTA.PATH}${PLANTILLA_EDOCUENTA.LOGO}`, 'base64');
    data.logo = `data:image/png;base64,${data.logo}`

    const imagenBase64 = await generarCodigoBarrasBase64(data.codigobarra)
    data.codebar = imagenBase64
    data.avisoPrivacidad = reemplazarValores(TEMPLATE_AVISO_PRIVACIDAD, data);

    //console.log(headerHtml)

    let tableMovimientos = createTableHtml(data.movimientos);
    let tableAbonosCapital = createTableHtml(data.abonosCapital);
    let tableComisiones = createTableHtml(data.comisiones, true);
    let tableRetenciones = createTableHtml(data.retenciones, true);
    let tableCargosObjetados = createTableHtml(data.cargosObjetados);
    let tableAbreviaturas = createTableHtml(data.abreviaturas);
    let mediosDePagos = createTableHtml(data.mediosDePagos);

    templateBodyHtml = reemplazarValores(templateBodyHtml, 
      { 
        tableMovimientos, 
        tableAbonosCapital, 
        tableComisiones, 
        tableRetenciones, 
        tableCargosObjetados,
        tableAbreviaturas,
        mediosDePagos
      });
    
    //LOG.info(`codebar: ${data.codebar}`)

    const template = handlebars.compile(templateBodyHtml)
    const finalHtml = template(data)

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.setContent(finalHtml, { waitUntil: 'domcontentloaded' })

    // Agregar CSS externo
    await page.addStyleTag({
      path: `${PLANTILLA_EDOCUENTA.PATH}${PLANTILLA_EDOCUENTA.CSS}`
    })

    const date = obtenerFechaHora()
    const nombreArchivoPdf = `${data.idContrato}${data.idCliente}EC${date}.pdf`
    nombreArchivoZip = `${data.idContrato}${data.idCliente}EC${date}.zip`

    const reg = {
      idContrato: data.idContrato,
      idCliente: data.idCliente,
      nombreArchivo: nombreArchivoZip
    }

    await insertEdoCta([reg])
    await page.pdf({
      path: nombreArchivoPdf,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      margin: {
        top: "20px",
        bottom: "80px"
      },
      headerTemplate: '',
      footerTemplate: templateFooterHtml
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

const createTableHtml= (array, addColumEmpty) => {
  let html = ''
  array.forEach(item => {
    html += '<tr>'
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
         html += '<td>'
         html += item[key]
         html += '</td>'
      }
    }
    if(addColumEmpty) html += '<td></td>'
    html += '</tr>'
  })
  return html
}

const reemplazarValores = (cadena, valores) => {
  return cadena.replace(/{{(.*?)}}/g, (_, clave) => valores[clave.trim()] || `{{${clave.trim()}}}`);
};

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

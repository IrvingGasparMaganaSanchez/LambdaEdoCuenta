import archiver from 'archiver'
import fs from 'fs'
import LOG from '../../commons/logger.js'
import zipEncrypted from 'archiver-zip-encrypted' // Importación estática

// Registrar el formato de cifrado una sola vez
archiver.registerFormat('zip-encrypted', zipEncrypted)

const crearZipConPass = async (outputPath, file, password) => {
  try {
    const output = fs.createWriteStream(outputPath)
    const archive = archiver('zip-encrypted', {
      zlib: { level: 9 },
      encryptionMethod: 'aes256',
      password
    })

    output.on('close', () => {
      LOG.info(`Archivo ZIP creado con contraseña: ${outputPath}`)
    })

    archive.on('error', err => {
      throw err
    })

    archive.pipe(output)
    archive.file(file, { name: file.split('/').pop() })
    await archive.finalize()
  } catch (error) {
    LOG.error('Error al generar el archivo ZIP')
    LOG.error(error)
  }
}

export { crearZipConPass }

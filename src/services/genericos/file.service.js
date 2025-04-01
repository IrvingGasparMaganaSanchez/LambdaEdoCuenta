import fs from 'fs'
import archiver from 'archiver'
import LOG from '../../commons/logger.js'

const crearZipConPass = async (outputPath, file, password) => {
  try {
    const { default: zipEncrypted } = await import('archiver-zip-encrypted')
    
    // Registrar el formato de cifrado
    archiver.registerFormat('zip-encrypted', zipEncrypted)

    const output = fs.createWriteStream(outputPath)
    const archive = archiver('zip-encrypted', {
      zlib: { level: 9 },
      encryptionMethod: 'aes256',
      password: password
    })

    output.on('close', () => {
      LOG.info(`Archivo ZIP creado con contraseña: ${outputPath}`)
    })

    archive.on('error', (err) => {
      throw err
    })

    archive.pipe(output)
    archive.file(file, { name: file.split('/').pop() })
    await archive.finalize()
  } catch (error) {
     LOG.error('Error al generar el archivo ZIP')
     LOG.error(error)
  }
};

export { crearZipConPass }

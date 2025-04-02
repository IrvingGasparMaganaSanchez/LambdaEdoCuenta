import { DECRYPT_AWS_REGION, VALUE_KMS } from './constants.js'
import { DecryptCommand, KMSClient } from '@aws-sdk/client-kms'

import LOG from './logger.js'

const client = new KMSClient({ region: DECRYPT_AWS_REGION })
export const decryptEnvVar = async valor => {
  try {
    const encrypted = valor
    const req = {
      CiphertextBlob: Buffer.from(encrypted, 'base64'),
      KeyId: VALUE_KMS
    }
    const command = new DecryptCommand(req)
    const response = await client.send(command)
    const decrypted = new TextDecoder().decode(response.Plaintext)
    return decrypted
  } catch (err) {
    LOG.error('Error al inicializar el cliente S3')
    LOG.error(err)
    throw err
  }
}

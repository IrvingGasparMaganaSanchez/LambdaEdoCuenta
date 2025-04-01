import "dotenv/config";

// context API
export const {
  env: { CONTEXT_NAME, CONTEXT_VERSION, CERTIFICATE }
} = process

// Credenciales de Mongo
export const {
  env: { MS_MONGODB_URL, MS_MONGODB_CERT_PATH, COLLECTION_NAME }
} = process

export const {
  env: { TEST_EXECUTE = 'false' }
} = process

export const PLANTILLA_EDOCUENTA = {
  PATH: './src/plantillas/',
  HTML: 'edoCuenta.html',
  CSS: 'estiloEdoCuenta.css'
} 

// Data de S3
export const {
  env: { YOUR_AWS_REGION, BUCKETNAME, FOLDERNAME, DECRYPT_AWS_REGION
  }
} = process

// Valores de Integracion
export const {
  env: { TZ = 'America/Mexico_City' }
} = process
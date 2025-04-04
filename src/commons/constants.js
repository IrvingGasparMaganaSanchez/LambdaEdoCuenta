import 'dotenv/config'

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
  HTMLBody: 'edoCuentaBody.html',
  HTMLHeader: 'edoCuentaHeader.html',
  HTMLFooter: 'edoCuentaFooter.html',
  CSS: 'estiloEdoCuenta.css',
  LOGO: 'logo.png'
}

// Env By Organizacion
export const {
  env: { NAME_ORGANIZACION, VALUE_KMS }
} = process

// Data de S3
export const {
  env: { YOUR_AWS_REGION, BUCKETNAME, FOLDERNAME, DECRYPT_AWS_REGION }
} = process

// Valores de Integracion
export const {
  env: { TZ = 'America/Mexico_City' }
} = process

export const TEMPLATE_AVISO_PRIVACIDAD = `{{nombreEmpresa}}, recibe las consultas, reclamaciones o aclaraciones, en su
Unidad Especializada de Atención a Usuarios, ubicada en {{direccionContacto}} y por correo electrónico ({{emailContacto}}) o teléfono (para la Ciudad de
México y Zona Metropolitana 5269 5202 y para el interior de la República 01 800 021 0683), asi como en
cualquier de sus sucursales u oficinas. En el caso de no obtener una respuesta satisfactoria, podrá acudir a la
Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros {{paginaConducef}}.
y teléfonos {{telContacto1}} o {{telContacto2}}.`

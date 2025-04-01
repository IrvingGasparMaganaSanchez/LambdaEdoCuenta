import moment from 'moment-timezone'
import { TZ } from '../../commons/constants.js'

const obtenerFechaHora = () => moment().tz(TZ).format('DDMMYYHHmm')

export { obtenerFechaHora }

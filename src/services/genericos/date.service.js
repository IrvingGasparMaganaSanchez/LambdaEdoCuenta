const obtenerFechaHora = () => {
    const ahora = new Date()
  
    const dd = String(ahora.getDate()).padStart(2, "0")
    const mm = String(ahora.getMonth() + 1).padStart(2, "0")
    const aa = String(ahora.getFullYear()).slice(-2)
    const hh = String(ahora.getHours()).padStart(2, "0")
    const min = String(ahora.getMinutes()).padStart(2, "0")
  
    return `${dd}${mm}${aa}${hh}${min}`
  }

  export { obtenerFechaHora }
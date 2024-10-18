import './style.css'
import Map from 'ol/Map.js'
import TileLayer from 'ol/layer/Tile.js'
import View from 'ol/View.js'
import { WMTSCapabilities } from 'ol/format'
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS'

/**
 * URL du service WMTS de Tefenua.
 * @type {string}
 */
const TEFENUA_WMTS_URL = 'https://www.tefenua.gov.pf/api/wmts'

/**
 * Récupère le Capabilities WMTS.
 * @return {Promise<string>}
 */
function fetchTefenuaWmtsCapabilities () {
  return fetch(
    TEFENUA_WMTS_URL + '?Request=GetCapabilities',
    { mode: 'cors' }
  )
    .then((resp) => resp.text())
    .then((xml) => new WMTSCapabilities().read(xml))
}

async function main () {
  // Récupère la configuration des couches.
  const capabilities = await fetchTefenuaWmtsCapabilities()

  // Couche de fond Tefenua.
  // Obtient les options WMTS de la couche pour un matrixSet et format donné.
  const fondWmts = optionsFromCapabilities(capabilities, {
    layer: 'TEFENUA:FOND',
    matrixSet: 'EPSG:4326',
    format: 'image/jpeg'
  })
  const fond = new TileLayer({
    zIndex: 1,
    source: new WMTS({
      ...fondWmts,
      attributions: ['Tefenua © Polynésie française']
    })
  })

  // Vue de carte centrée sur Tahiti.
  const view = new View({
    projection: 'EPSG:4326',
    center: [-149.45, -17.75],
    zoom: 10
  })

  // Carte avec interactions et controles par défaut.
  const map = new Map({
    target: 'map',
    view,
    layers: [
      fond
    ]
  })
}

await main()

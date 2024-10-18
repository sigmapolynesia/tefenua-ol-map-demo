import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

/**
 * URL du service WMTS de Tefenua.
 * @type {string}
 */
const TEFENUA_WMTS_URL = 'https://www.tefenua.gov.pf/api/wmts'

export function leafletDemo () {
  const map = L.map('ll-map', {
    crs: L.CRS.EPSG4326
  }).setView([-17.75, -149.45], 9)

  L.tileLayer(
    TEFENUA_WMTS_URL + '?' +
    'Service=WMTS' +
    '&Version=1.0.0' +
    '&Request=GetTile' +
    `&Layer=${encodeURIComponent('TEFENUA:FOND')}` +
    `&Format=${encodeURIComponent('image/jpeg')}` +
    '&Style=default' +
    `&TileMatrixSet=${encodeURIComponent('EPSG:4326')}` +
    '&TileMatrix={z}' +
    '&TileCol={x}' +
    '&TileRow={y}',
    {
      minZoom: 0,
      maxZoom: 18,
      tileSize: 256
    }
  ).addTo(map)
}

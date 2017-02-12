// Load environment variables
require('dotenv').config()

const Maps = require('@google/maps')
const geolib = require('geolib')
const Brewery = require('./models/brewery')

// Create Google Maps client
const maps = Maps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise
})

// Get input from command line
const input = process.argv[2]

const promises = [
  Brewery.sync().then(
    () => Brewery.findAll().then(
      breweries => breweries.map(brewery => brewery.toJSON())
    )
  ),
  maps.geocode({ address: input }).asPromise().then((response) => {
    const { results, status } = response.json

    if (status === 'OK' && results.length > 0) {
      return results[0].geometry.location
    } else {
      throw Error('No result found')
    }
  })
]

Promise.all(promises).then(values => {
  const [breweries, location] = values

  // Get a quick approximation of the distance to this brewery
  breweries.forEach(brewery => {
    brewery.distance = geolib.getDistance(location, brewery)
  })

  // Sort based on distance
  breweries.sort((a, b) => (a.distance - b.distance))

  // Pick three with shortest (approximated) distance
  return breweries.slice(0, 3)
}).then(breweries => {

  const promises = breweries.map((brewery) => {
    return maps.directions({
      origin: input,
      destination: `${brewery.address}, ${brewery.city}`,
      mode: 'driving'
    }).asPromise().then(response => {
      const leg = response.json.routes[0].legs[0]

      brewery.distance = leg.distance
      brewery.duration = leg.duration
      brewery.steps = leg.steps

      return brewery
    })
  })

  return Promise.all(promises)

}).then(breweries => {

  // Sort based on travel time
  breweries.sort((a, b) => (a.duration.value - b.duration.value))

  // Closest brewery
  const brewery = breweries[0]

  console.log(`${brewery.name}, ${brewery.address}, ${brewery.city}`)
})

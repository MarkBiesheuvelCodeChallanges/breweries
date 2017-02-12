// Load environment variables
require('dotenv').config()

const Maps = require('@google/maps')
const Brewery = require('./models/brewery')
const breweries = require('./data/breweries')

// Create Google Maps client
const maps = Maps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise
})

Brewery.sync({ force: true }).then(() => {
  breweries.forEach(brewery => {
    // Geocode address of brewery to get coordinates
    maps.geocode({ address: `${brewery.address}, ${brewery.city}` }).asPromise()
      .then(response => {
        const { results, status } = response.json

        if (status === 'OK' && results.length > 0) {
          // Pick first result
          const [result] = results

          // Add coordinates to the info we already add and store in the database
          Brewery.create(
            Object.assign(
              brewery,
              result.geometry.location
            )
          )
        }
      })
  })
})

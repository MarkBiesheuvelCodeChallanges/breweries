// Load environment variables
require('dotenv').config()

const Maps = require('@google/maps')
const Brewery = require('./models/brewery')
const breweries = require('./data/breweries')

// Create Google Maps client
const maps = Maps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
})

Brewery.sync({ force: true }).then(() => {
  breweries.forEach((brewery) => {
    // Geocode address of brewery to get coordinates
    maps.geocode({ address: `${brewery.address}, ${brewery.city}` }, (error, result) => {
      // Skip in case of an error
      if (error) {
        return
      }

      const { results, status } = result.json

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

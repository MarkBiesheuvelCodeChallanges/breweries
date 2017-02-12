const dotenv = require('dotenv')
const Sequelize = require('sequelize')
const Maps = require('@google/maps')
const breweries = require('./data/breweries')

// Load environment variables
dotenv.config()

// Create Google Maps client
const maps = Maps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
})

// Create database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH,
  define: {
    timestamps: false
  }
})

// Describe database model
const Brewery = sequelize.define('brewery', {
  name: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  zipcode: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  lat: { type: Sequelize.FLOAT },
  lng: { type: Sequelize.FLOAT }
})

Brewery.sync({ force: true }).then(function () {
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

const geolib = require('geolib')
const Brewery = require('./models/brewery')

const office = { lat: 52.358510, lng: 4.903662 }

Brewery.sync().then(() => {
  Brewery.findAll().then((breweries) => {
    breweries.forEach((brewery) => {
      console.log(brewery.name)

      const distance = geolib.getDistance(office, brewery.toJSON())

      console.log(distance)
    })
  })
})

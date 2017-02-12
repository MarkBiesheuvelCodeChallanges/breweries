const Sequelize = require('sequelize')

// Create database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite', // TODO: fix problem with dotenv and require
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

module.exports = Brewery

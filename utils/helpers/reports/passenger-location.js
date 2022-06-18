const { Bookings, LoopBusLocations } = require('~/models');
const { Sequelize } = require('sequelize');

module.exports = async () => {
  let result;

  result = await Bookings.count({
    where: {
      
    }
  })

  
  return result;
}
const { Bookings, LoopBusLocations } = require('~/models');

const { Op, Sequelize } = require("sequelize");
module.exports = async (queryDetails) => {
  let result = {};

  const bookingsLoopBus1 = await Bookings.findAll(
    {
      where: {
        where: Sequelize.where(Sequelize.fn('date', Sequelize.col('createdAt')), '=', queryDetails),
        loopBusId: 1
      }
    }
  )

  const bookingsLoopBus2 = await Bookings.findAll(
    {
      where: {
        where: Sequelize.where(Sequelize.fn('date', Sequelize.col('createdAt')), '=', queryDetails),
        loopBusId: 2
      }
    }
  )
  
  
  result = {
    loopBus1: bookingsLoopBus1.length,
    loopBus2: bookingsLoopBus2.length
  }

  return result;
}
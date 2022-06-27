const { Bookings, LoopBusLocations, Tickets } = require('~/models');

const { Op, Sequelize } = require("sequelize");
module.exports = async (queryDetails) => {
  let result = {};

  const bookingsLoopBus1 = await Bookings.findAll(
    {
      include: Tickets,
      where: {
        where: Sequelize.where(Sequelize.fn('date', Sequelize.col('createdAt')), '=', queryDetails),
        loopBusId: 1
      }
    }
  )

  const bookingsLoopBus2 = await Bookings.findAll(
    {
      include: Tickets,
      where: {
        where: Sequelize.where(Sequelize.fn('date', Sequelize.col('createdAt')), '=', queryDetails),
        loopBusId: 2
      }
    }
  )

  let countLoopBus1 = 0;
  let countLoopBus2 = 0;

  bookingsLoopBus1.forEach(booking => {
    countLoopBus1 += booking.tickets.length
  })

  bookingsLoopBus2.forEach(booking => {
    countLoopBus2 += booking.tickets.length
  })
  
  
  result = {
    loopBus1: {
      [queryDetails]: countLoopBus1
    },
    loopBus2: {
      [queryDetails]: countLoopBus2
    }
  }

  return result;
}
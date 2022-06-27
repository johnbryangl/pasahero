const { Bookings, LoopBusLocations, Tickets } = require('~/models');
const { Sequelize } = require('sequelize');

module.exports = async () => {
  let result = {};

  const bookings = await Bookings.findAll({ include: Tickets })
  console.log(bookings[0].tickets.length)
  const locations = await LoopBusLocations.findAll({ raw: true })

  const locationsLoopBus1 = await LoopBusLocations.findAll({ raw: true, where: { loopBusId: 1 } })
  const locationsLoopBus2 = await LoopBusLocations.findAll({ raw: true, where: { loopBusId: 2 } })

  let uniqueLocationsLoopBus1 = {};
  locationsLoopBus1.forEach(loc => {
    uniqueLocationsLoopBus1[loc.location] = 0
  });
  let uniqueLocationsLoopBus2 = {};
  locationsLoopBus2.forEach(loc => {
    uniqueLocationsLoopBus2[loc.location] = 0
  });

  bookings.forEach(booking => {
    if (booking.loopBusId == 1) {
      uniqueLocationsLoopBus1[locations.find(loc => loc.id == booking.loopBusLocationIdPickup).location] += booking.tickets.length
    } else {
      uniqueLocationsLoopBus2[locations.find(loc => loc.id == booking.loopBusLocationIdPickup).location] += booking.tickets.length
    }
  })

  
  result = {
    loopBus1: uniqueLocationsLoopBus1,
    loopBus2: uniqueLocationsLoopBus2
  }

  return result;
}
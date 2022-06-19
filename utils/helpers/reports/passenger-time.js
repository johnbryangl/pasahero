const { Bookings, LoopBusLocations, LoopBuses } = require('~/models');

const { Op, Sequelize } = require("sequelize");
module.exports = async () => {
  let result = {};

  async function getResults () {
    let loopBus1Hours = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
      23: 0,
    }
  
    let loopBus2Hours = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
      23: 0,
    }

    for (let time of Object.keys(loopBus1Hours)) {
      let bookingsLoopBus1 = await Bookings.findAll(
        {
          where: {
            where: Sequelize.where(Sequelize.fn('hour', Sequelize.col('createdAt')), '=', time),
            loopBusId: 1
          }
        }
      )
  
      loopBus1Hours[time] = bookingsLoopBus1.length
    }

    for (let time of Object.keys(loopBus2Hours)) {
      let bookingsLoopBus2 = await Bookings.findAll(
        {
          where: {
            where: Sequelize.where(Sequelize.fn('hour', Sequelize.col('createdAt')), '=', time),
            loopBusId: 2
          }
        }
      )
  
      loopBus2Hours[time] = bookingsLoopBus2.length
    }
  
  

    return {
      loopBus1: loopBus1Hours,
      loopBus2: loopBus2Hours
    }
  }
 
  result = await getResults()

  return result;
}
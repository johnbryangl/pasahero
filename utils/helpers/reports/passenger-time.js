const { Bookings, LoopBusLocations, LoopBuses } = require('~/models');

const { Op, Sequelize } = require("sequelize");

const timeConversion = {
  0: '12 AM',
  1: '1 AM',
  2: '2 AM',
  3: '3 AM',
  4: '4 AM',
  5: '5 AM',
  6: '6 AM',
  7: '7 AM',
  8: '8 AM',
  9: '9 AM',
  10: '10 AM',
  11: '11 AM',
  12: '12 PM',
  13: '1 PM',
  14: '2 PM',
  15: '3 PM',
  16: '4 PM',
  17: '5 PM',
  18: '6 PM',
  19: '7 PM',
  20: '8 PM',
  21: '9 PM',
  22: '10 PM',
  23: '11 PM',
}
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
  
    let newLoopBus1Hours = {};
    let newLoopBus2Hours = {};



    Object.entries(loopBus1Hours).forEach(([k,v]) => {
      newLoopBus1Hours[timeConversion[k]] = v
    })

    Object.entries(loopBus2Hours).forEach((k,v) => {
      newLoopBus2Hours[timeConversion[k]] = v
    })


    return {
      loopBus1: newLoopBus1Hours,
      loopBus2: newLoopBus1Hours
    }
  }
 
  result = await getResults()

  return result;
}
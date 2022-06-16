const Errors = require('http-errors');

const { LoopBuses, LoopBusLocations } = require('~/models');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');
const  moment  = require('moment');
const { sequelize } = require('~/models');

module.exports = async (schedule) => {
  const locations = await LoopBusLocations.findAll({ raw: true });
  
  await LoopBuses.update({ loopBusLocationId: 1 }, {
    where: {
      id: 1
    }
  });

  await LoopBuses.update({ loopBusLocationId: 10 }, {
    where: {
      id: 2
    }
  });
  let loopBus1CurrentLoc = locations.find(location => location.id == 1)
  let loopBus1NextLoc = locations.find(location => location.id == 2)

  let loopBus2CurrentLoc = locations.find(location => location.id == 10)
  let loopBus2NextLoc = locations.find(location => location.id == 11)

  let loopBus1Eta = moment(new Date()).add(loopBus1NextLoc.durationInto, 'm').toLocaleString();
  let loopBus2Eta = moment(new Date()).add(loopBus2NextLoc.durationInto, 'm').toLocaleString();

  console.log(`\n\nLoop Bus 1 will arrive at stop #${loopBus1NextLoc.stopNumber} by ${loopBus1Eta}.`)
  console.log(`Loop Bus 2 will arrive at stop #${loopBus2NextLoc.stopNumber} by ${loopBus2Eta}.`)
  const job = schedule.scheduleJob('*/1 * * * * *', async function(){
    let currentDate = moment(new Date()).toLocaleString()

    if (currentDate == loopBus1Eta) {
      let nextStop = loopBus1NextLoc.stopNumber + 1
      
      loopBus1CurrentLoc = loopBus1NextLoc
      let updatedLoopBus1NextLoc = locations.find(location => location.stopNumber == nextStop && location.loopBusId == 1)
      
      console.log(`Loop Bus 1 has arrived at stop #${loopBus1NextLoc.stopNumber} at ${loopBus1Eta}.`)
      if (!updatedLoopBus1NextLoc) {
        loopBus1NextLoc = locations.find(location => location.id == 1)
      } else {
        loopBus1NextLoc = updatedLoopBus1NextLoc
      }
      loopBus1Eta = moment(new Date()).add(loopBus1NextLoc.durationInto, 'm').toLocaleString();
      await LoopBuses.update({ loopBusLocationId: loopBus1CurrentLoc.id }, {
        where: {
          id: 1
        }
      });

      console.log(`Loop Bus 1 will arrive at stop #${loopBus1NextLoc.stopNumber} by ${loopBus1Eta}.`)
    }

    if (currentDate == loopBus2Eta) {
      let nextStop = loopBus2NextLoc.stopNumber + 1
      
      loopBus2CurrentLoc = loopBus2NextLoc
      let updatedLoopBus2NextLoc = locations.find(location => location.stopNumber == nextStop && location.loopBusId == 2)
      
      console.log(`Loop Bus 2 has arrived at stop #${loopBus2NextLoc.stopNumber} at ${loopBus2Eta}.`)
      if (!updatedLoopBus2NextLoc) {
        loopBus2NextLoc = locations.find(location => location.id == 10)
      } else {
        loopBus2NextLoc = updatedLoopBus2NextLoc
      }
      loopBus2Eta = moment(new Date()).add(loopBus2NextLoc.durationInto, 'm').toLocaleString();
      await LoopBuses.update({ loopBusLocationId: loopBus2CurrentLoc.id }, {
        where: {
          id: 2
        }
      });

      console.log(`Loop Bus 2 will arrive at stop #${loopBus2NextLoc.stopNumber} by ${loopBus2Eta}.`)
    }
  });
 
}
const Errors = require('http-errors');

const { LoopBusLocations } = require('~/models');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');

exports.getAll = async (userPayload, loopBusIdFilter) => {
  try {
    let result;
    if (loopBusIdFilter) {
      result = await LoopBusLocations.findAll({ where: { loopBusId: loopBusIdFilter } });
    } else {
      result = await LoopBusLocations.findAll();
    }
    return result
  } catch (err) {
    console.log(`[Loop Bus Locations Service]: loop-bus-locations.service.getAll - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

exports.get = async (userPayload, loopBusLocationId) => {
  try {
    const result = await LoopBusLocations.findByPk(loopBusLocationId);
    if (!result) {
      throw new Errors(HTTP_STATUS.NotFoundError, ERROR_MESSAGE.ERR4001007);
    }
    return result
  } catch (err) {
    console.log(`[Loop Bus Locations Service]: loop-bus-locations.service.get - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

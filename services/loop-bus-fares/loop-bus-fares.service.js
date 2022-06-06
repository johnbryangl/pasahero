const Errors = require('http-errors');

const { LoopBusFares } = require('~/models');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');

exports.getAll = async (userPayload, loopBusIdFilter) => {
  try {
    let result;
    if (loopBusIdFilter) {
      result = await LoopBusFares.findAll({ where: { loopBusId: loopBusIdFilter } });
    } else {
      result = await LoopBusFares.findAll();
    }
    return result
  } catch (err) {
    console.log(`[Loop Bus Fares Service]: loop-bus-fares.service.getAll - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

exports.get = async (userPayload, loopBusFareId) => {
  try {
    const result = await LoopBusFares.findByPk(loopBusFareId);
    if (!result) {
      throw new Errors(HTTP_STATUS.NotFoundError, ERROR_MESSAGE.ERR4001007);
    }
    return result
  } catch (err) {
    console.log(`[Loop Bus Fares Service]: loop-bus-fares.service.get - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

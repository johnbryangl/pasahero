const Errors = require('http-errors');

const { LoopBuses } = require('~/models');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');

exports.getAll = async (userPayload) => {
  try {
    const result = await LoopBuses.findAll();
    return result
  } catch (err) {
    console.log(`[Loop Buses Service]: loop-buses.service.getAll - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

exports.get = async (userPayload, loopBusId) => {
  try {
    const result = await LoopBuses.findByPk(loopBusId);
    if (!result) {
      throw new Errors(HTTP_STATUS.NotFoundError, ERROR_MESSAGE.ERR4001007);
    }
    return result
  } catch (err) {
    console.log(`[Loop Buses Service]: loop-buses.service.get - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

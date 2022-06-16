const service = require('~/services/loop-bus-locations/loop-bus-locations.service');
const { handleSuccessResponse, handleErrorResponse } = require('~/utils/helpers/handle-response');
const { SUCCESS_MESSAGE } = require('~/utils/constants/success-messages');

exports.getAll = async (req, res) => {
  try {
    const { user: userPayload, query: { loopBusIdFilter } } = req;
    const result = await service.getAll(userPayload, loopBusIdFilter);
    handleSuccessResponse(res, SUCCESS_MESSAGE.FARE2004001, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.get = async (req, res) => {
  try {
    const { user: userPayload, params: { id: loopBusLocationId } } = req;
    const result = await service.get(userPayload, loopBusLocationId);
    handleSuccessResponse(res, SUCCESS_MESSAGE.FARE2004002, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

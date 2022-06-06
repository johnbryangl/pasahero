const service = require('~/services/loop-buses/loop-buses.service');
const { handleSuccessResponse, handleErrorResponse } = require('~/utils/helpers/handle-response');
const { SUCCESS_MESSAGE } = require('~/utils/constants/success-messages');

exports.getAll = async (req, res) => {
  try {
    const { user: userPayload } = req;
    const result = await service.getAll(userPayload);
    handleSuccessResponse(res, SUCCESS_MESSAGE.BUS2003001, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.get = async (req, res) => {
  try {
    const { user: userPayload, params: { id: loopBusId } } = req;
    const result = await service.get(userPayload, loopBusId);
    handleSuccessResponse(res, SUCCESS_MESSAGE.BUS2003002, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

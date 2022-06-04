const service = require('~/services/bookings/bookings.service');
const { handleSuccessResponse, handleErrorResponse } = require('~/utils/helpers/handle-response');
const { SUCCESS_MESSAGE } = require('~/utils/constants/success-messages');

exports.getAll = async (req, res) => {
  try {
    const { user: userPayload } = req;
    const result = await service.getAll(userPayload);
    handleSuccessResponse(res, SUCCESS_MESSAGE.BOOK2002001, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.get = async (req, res) => {
  try {
    const { user: userPayload, params: { id: bookingId } } = req;
    const result = await service.get(userPayload, bookingId);
    handleSuccessResponse(res, SUCCESS_MESSAGE.BOOK2002002, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.add = async (req, res) => {
  try {
    const { user: userPayload, body: bookingDetails } = req;
    const result = await service.add(userPayload, bookingDetails);
    handleSuccessResponse(res, SUCCESS_MESSAGE.BOOK2002003, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};


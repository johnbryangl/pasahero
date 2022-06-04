const service = require('~/services/users/users.service');
const { handleSuccessResponse, handleErrorResponse } = require('~/utils/helpers/handle-response');
const { SUCCESS_MESSAGE } = require('~/utils/constants/success-messages');

exports.getAll = async (req, res) => {
  try {
    const { user: userPayload } = req;
    const result = await service.getAll(userPayload);
    handleSuccessResponse(res, SUCCESS_MESSAGE.AUTH2001001, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.get = async (req, res) => {
  try {
    const { user: userPayload, params: { id: userId } } = req;
    const result = await service.get(userPayload, userId);
    handleSuccessResponse(res, SUCCESS_MESSAGE.AUTH2001002, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.add = async (req, res) => {
  try {
    const { user: userPayload, body: userDetails } = req;
    const result = await service.add(userPayload, userDetails);
    handleSuccessResponse(res, SUCCESS_MESSAGE.AUTH2001003, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.update = async (req, res) => {
  try {
    const { user: userPayload, params: { id: userId }, body: updatedUserDetails } = req;
    const result = await service.update(userPayload, userId, updatedUserDetails);
    handleSuccessResponse(res, SUCCESS_MESSAGE.AUTH2001004, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { user: userPayload, params: { id: userId } } = req;
    const result = await service.delete(userPayload, userId);
    handleSuccessResponse(res, SUCCESS_MESSAGE.AUTH2001005, result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

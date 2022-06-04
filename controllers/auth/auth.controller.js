const service = require('~/services/auth/auth.service');
const { handleSuccessResponse, handleErrorResponse } = require('~/utils/helpers/handle-response');

const logIn = async (req, res) => {
  try {
    const { id: userId, password } = req.body;
    const result = await service.logIn(userId, password);
    handleSuccessResponse(res, '', result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

module.exports = {
  logIn
}
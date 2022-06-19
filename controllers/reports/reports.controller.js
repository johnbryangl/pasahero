const service = require('~/services/reports/reports.service');
const { handleSuccessResponse, handleErrorResponse } = require('~/utils/helpers/handle-response');

const get = async (req, res) => {
  try {
    
    const { user: userPayload, query: { reportType, queryDetails } } = req;
    const result = await service.get(userPayload, reportType, queryDetails);
    handleSuccessResponse(res, '', result);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

module.exports = {
  get
}
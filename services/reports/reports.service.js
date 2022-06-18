const Errors = require('http-errors');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');
const reportPassengerLocation = require('~/utils/helpers/reports/passenger-location');

exports.get = async (userPayload, reportType) => {
  try {
    let report = await reportPassengerLocation();

    if (reportType === '') {
      
    } else if (reportType === '') {

    }

    return report;
  } catch (err) {
    console.log(`[Reports Service]: reports.service.logIn - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};


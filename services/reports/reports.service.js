const Errors = require('http-errors');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');

const reportPassengerLocation = require('~/utils/helpers/reports/passenger-location');
const reportPassengerDate = require('~/utils/helpers/reports/passenger-date');
const reportPassengerTime = require('~/utils/helpers/reports/passenger-time');
exports.get = async (userPayload, reportType, queryDetails) => {
  try {
    let report;

    if (reportType === 'passenger-by-location') {
      report = await reportPassengerLocation();
    } else if (reportType === 'passenger-by-date') {
      report = await reportPassengerDate(queryDetails)
    } else if (reportType === 'passenger-by-time') {
      report = await reportPassengerTime()
    }

    return report;
  } catch (err) {
    console.log(`[Reports Service]: reports.service.get - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};


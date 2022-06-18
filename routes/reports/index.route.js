const asyncHandler = require('express-async-handler');
const controller = require('~/controllers/reports/reports.controller');
const prefix = '/reports'

module.exports = (router) => {
  router.get(`${prefix}`, asyncHandler(controller.get));
}
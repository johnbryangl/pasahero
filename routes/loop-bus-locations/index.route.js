const asyncHandler = require('express-async-handler');
const controller = require('~/controllers/loop-bus-locations/loop-bus-locations.controller');
const { auth } = require('~/middlewares/auth');
const prefix = '/loop-bus-locations'

module.exports = (router) => {
  router.get(`${prefix}`, auth, asyncHandler(controller.getAll));
  router.get(`${prefix}/:id`, auth, asyncHandler(controller.get));
}
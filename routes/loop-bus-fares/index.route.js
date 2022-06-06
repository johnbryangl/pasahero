const asyncHandler = require('express-async-handler');
const controller = require('~/controllers/loop-bus-fares/loop-bus-fares.controller');
const { auth } = require('~/middlewares/auth');
const prefix = '/loop-bus-fares'

module.exports = (router) => {
  router.get(`${prefix}`, auth, asyncHandler(controller.getAll));
  router.get(`${prefix}/:id`, auth, asyncHandler(controller.get));
}
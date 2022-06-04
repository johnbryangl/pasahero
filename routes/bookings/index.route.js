const asyncHandler = require('express-async-handler');
const controller = require('~/controllers/bookings/bookings.controller');
const { auth } = require('~/middlewares/auth');
const prefix = '/bookings'

module.exports = (router) => {
  router.get(`${prefix}`, auth, asyncHandler(controller.getAll));
  router.get(`${prefix}/:id`, auth, asyncHandler(controller.get));
  router.post(`${prefix}`, auth, asyncHandler(controller.add));
}
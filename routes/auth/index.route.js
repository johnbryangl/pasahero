const asyncHandler = require('express-async-handler');
const controller = require('~/controllers/auth/auth.controller');
const prefix = '/auth'

module.exports = (router) => {
  router.post(`${prefix}/logIn`, asyncHandler(controller.logIn));
}
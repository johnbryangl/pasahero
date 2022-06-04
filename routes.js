const express = require('express');
const router = express.Router();

const authRoutes = require('~/routes/auth/index.route');
const usersRoutes = require('~/routes/users/index.route');
const bookingsRoutes = require('~/routes/bookings/index.route');
module.exports = (app) => {
  authRoutes(router);
  usersRoutes(router);
  bookingsRoutes(router);
  app.use('/api', router);
};
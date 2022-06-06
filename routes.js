const express = require('express');
const router = express.Router();

const authRoutes = require('~/routes/auth/index.route');
const usersRoutes = require('~/routes/users/index.route');
const bookingsRoutes = require('~/routes/bookings/index.route');

const loopBusesRoutes = require('~/routes/loop-buses/index.route');
const loopBusFaresRoutes = require('~/routes/loop-bus-fares/index.route');

module.exports = (app) => {
  authRoutes(router);
  usersRoutes(router);
  bookingsRoutes(router);
  loopBusesRoutes(router);
  loopBusFaresRoutes(router);
  app.use('/api', router);
};
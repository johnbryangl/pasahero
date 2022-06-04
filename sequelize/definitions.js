module.exports = (sequelize, DataTypes) => {
  const Users = require('~/models/users/index.model')(sequelize, DataTypes);

  const LoopBuses = require('~/models/loop-buses/index.model')(sequelize, DataTypes);
  const LoopBusLocations = require('~/models/loop-bus-locations/index.model')(sequelize, DataTypes);
  const LoopBusLocationTransitDurations = require('~/models/loop-bus-location-transit-durations/index.model')(sequelize, DataTypes);
  const LoopBusFares = require('~/models/loop-bus-fares/index.model')(sequelize, DataTypes);

  const Bookings = require('~/models/bookings/index.model')(sequelize, DataTypes);
  const Tickets = require('~/models/tickets/index.model')(sequelize, DataTypes);
  return {
    Users,
    LoopBuses,
    LoopBusLocations,
    LoopBusLocationTransitDurations,
    LoopBusFares,
    Bookings,
    Tickets,
  }
}


module.exports = (models) => {
  // loop-bus-location-transit-duration has reference to loop-bus 
  models.LoopBuses.hasMany(models.LoopBusLocationTransitDurations, { foreignKey: { allowNull: false } });
  models.LoopBusLocationTransitDurations.belongsTo(models.LoopBuses, { foreignKey: {  allowNull: false } });

  // loop-bus-location-transit-duration has reference to loop-bus-location
  models.LoopBusLocations.hasMany(models.LoopBusLocationTransitDurations, { foreignKey: { name: 'fromLoopBusLocationId', allowNull: false } });
  models.LoopBusLocationTransitDurations.belongsTo(models.LoopBusLocations, { foreignKey: { name: 'fromLoopBusLocationId', allowNull: false } });

  models.LoopBusLocations.hasMany(models.LoopBusLocationTransitDurations, { foreignKey: { name: 'toLoopBusLocationId', allowNull: false } });
  models.LoopBusLocationTransitDurations.belongsTo(models.LoopBusLocations, { foreignKey: { name: 'toLoopBusLocationId', allowNull: false } });

  // loop-bus-fare has reference to loop-bus 
  models.LoopBuses.hasMany(models.LoopBusFares, { foreignKey: { allowNull: false } });
  models.LoopBusFares.belongsTo(models.LoopBuses, { foreignKey: {  allowNull: false } });

  // a user can create many bookings
  models.Users.hasMany(models.Bookings, { foreignKey: { allowNull: false } });
  models.Bookings.belongsTo(models.Users, { foreignKey: { allowNull: false } });

  // a booking can have many tickets
  models.Bookings.hasMany(models.Tickets, { foreignKey: { allowNull: false } });
  models.Tickets.belongsTo(models.Bookings, { foreignKey: { allowNull: false } });

  // a ticket has reference to loop-bus-fare
  models.LoopBusFares.hasMany(models.Tickets, { foreignKey: { allowNull: false } });
  models.Tickets.belongsTo(models.LoopBusFares, { foreignKey: {  allowNull: false } });

  return models
};

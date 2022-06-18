module.exports = (models) => {
  // loop-bus-fare has reference to loop-bus 
  models.LoopBuses.hasMany(models.LoopBusFares, { foreignKey: { allowNull: false } });
  models.LoopBusFares.belongsTo(models.LoopBuses, { foreignKey: {  allowNull: false } });

  // booking has reference to loop-bus 
  models.LoopBuses.hasMany(models.Bookings, { foreignKey: { allowNull: false } });
  models.Bookings.belongsTo(models.LoopBuses, { foreignKey: {  allowNull: false } });

  // booking has optional reference to loop-bus -locations
  models.LoopBusLocations.hasMany(models.Bookings, { foreignKey: 'loopBusLocationIdPickup' });
  models.Bookings.belongsTo(models.LoopBusLocations, { foreignKey: 'loopBusLocationIdPickup' });

  // booking has optional reference to loop-bus -locations
  models.LoopBusLocations.hasMany(models.Bookings, { foreignKey: 'loopBusLocationIdDropoff' });
  models.Bookings.belongsTo(models.LoopBusLocations, { foreignKey: 'loopBusLocationIdDropoff' });

  // loop-bus-location has reference to loop-bus 
  models.LoopBuses.hasMany(models.LoopBusLocations, { foreignKey: { allowNull: false } });
  models.LoopBusLocations.belongsTo(models.LoopBuses, { foreignKey: {  allowNull: false } });

  // loop-bus has optional reference to loop-bus-location
  models.LoopBusLocations.hasMany(models.LoopBuses);
  models.LoopBuses.belongsTo(models.LoopBusLocations);

  // a user can create many bookings
  models.Users.hasMany(models.Bookings, { foreignKey: { allowNull: false } });
  models.Bookings.belongsTo(models.Users, { foreignKey: { allowNull: false } });

  // a user has optional reference to loop-bus
  models.LoopBuses.hasMany(models.Users);
  models.Users.belongsTo(models.LoopBuses);

  // a booking can have many tickets
  models.Bookings.hasMany(models.Tickets, { foreignKey: { allowNull: false } });
  models.Tickets.belongsTo(models.Bookings, { foreignKey: { allowNull: false } });

  // a ticket has reference to loop-bus-fare
  models.LoopBusFares.hasMany(models.Tickets, { foreignKey: { allowNull: false } });
  models.Tickets.belongsTo(models.LoopBusFares, { foreignKey: {  allowNull: false } });

  return models
};

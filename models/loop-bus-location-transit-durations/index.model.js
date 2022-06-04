module.exports = (sequelize, DataTypes) => {
  return sequelize.define('loop_bus_location_transit_durations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transitDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
    
  }, { timestamps: false });
};
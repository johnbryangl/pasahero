module.exports = (sequelize, DataTypes) => {
  return sequelize.define('loop_bus_locations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stopNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    durationInto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, { timestamps: false });
};
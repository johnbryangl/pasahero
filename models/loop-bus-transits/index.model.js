module.exports = (sequelize, DataTypes) => {
  return sequelize.define('loop_bus_transits', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
  }, { timestamps: false });
};
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('loop_bus_fares', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fareType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  }, { timestamps: false });
};
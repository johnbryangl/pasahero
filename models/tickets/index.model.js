module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tickets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, { timestamps: false });
};
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('loop_buses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { timestamps: false });
};
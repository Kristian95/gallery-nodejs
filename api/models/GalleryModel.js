module.exports = (sequelize, DataTypes) => {
    const image = sequelize.define("image", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
    });
  
    return image;
  };
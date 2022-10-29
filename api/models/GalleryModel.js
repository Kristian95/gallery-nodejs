module.exports = (sequelize, DataTypes) => {
    const gallery = sequelize.define("gallery", {
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
  
    return gallery;
  };
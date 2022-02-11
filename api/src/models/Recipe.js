const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    spoonacularScore:{
      type: DataTypes.INTEGER,
    },
    healtscore:{
      type: DataTypes.INTEGER,
    },
    analyzedInstructions:{
      type: DataTypes.STRING,
    }
  });
};

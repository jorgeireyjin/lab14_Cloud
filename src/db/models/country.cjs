const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return country.init(sequelize, DataTypes);
}

class country extends Sequelize.Model {
  
      static associate(models) {
      // define association here
      country.hasMany(models.city, { as: "cities", foreignKey: "country_id"});
    }

  static init(sequelize, DataTypes) {
  return super.init({
    country_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'country',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "country_pkey",
        unique: true,
        fields: [
          { name: "country_id" },
        ]
      },
    ]
  });
  }
}

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return city.init(sequelize, DataTypes);
}

class city extends Sequelize.Model {
  static associate(models) {
    // define association here
    city.hasMany(models.address, { as: "addresses", foreignKey: "city_id" });
    city.belongsTo(models.country, { as: "country", foreignKey: "country_id" });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      city_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      country_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: 'country',
          key: 'country_id'
        }
      },
      last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      }
    }, {
      sequelize,
      tableName: 'city',
      schema: 'public',
      hasTrigger: true,
      timestamps: false,
      indexes: [
        {
          name: "city_pkey",
          unique: true,
          fields: [
            { name: "city_id" },
          ]
        },
        {
          name: "idx_fk_country_id",
          fields: [
            { name: "country_id" },
          ]
        },
      ]
    });
  }
}

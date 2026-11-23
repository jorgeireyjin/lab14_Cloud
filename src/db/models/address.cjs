const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return address.init(sequelize, DataTypes);
}

class address extends Sequelize.Model {
  static associate(models) {
    // define association here
    address.hasMany(models.customer, { as: "customers", foreignKey: "address_id" });
    address.belongsTo(models.city, { as: "city", foreignKey: "city_id" });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      address_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      address2: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      district: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      city_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: 'city',
          key: 'city_id'
        }
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      }
    }, {
      sequelize,
      tableName: 'address',
      schema: 'public',
      hasTrigger: true,
      timestamps: false,
      indexes: [
        {
          name: "address_pkey",
          unique: true,
          fields: [
            { name: "address_id" },
          ]
        },
        {
          name: "idx_fk_city_id",
          fields: [
            { name: "city_id" },
          ]
        },
      ]
    });
  }
}

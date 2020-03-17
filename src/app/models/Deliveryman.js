import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        enabled: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'deliverymen',
      }
    );

    return this;
  }
}

export default Deliveryman;

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cellphone: Sequelize.INTEGER,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, '123456789', { expiresIn: '1d' });
  }
}

export default User;

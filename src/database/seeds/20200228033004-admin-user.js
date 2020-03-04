const bcrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          name: 'Distribuidora FastFeet',
          email: 'admin@fastfeet.com',
          cellphone: 11977234567,
          password: bcrypt.hashSync('123456', bcrypt.genSaltSync(8)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};

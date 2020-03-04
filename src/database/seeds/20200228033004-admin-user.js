const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Distribuidora FastFeet',
          email: 'admin@fastfeet.com',
          cellphone: 11977234567,
          password: bcrypt.hashSync('123456', bcrypt.genSaltSync(8)),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

class Owner {

  static findOwnersPets(id) {
    return database('owners')
      .join('pets', {'owners.id': 'pets.owner_id'})
      .where('pets.owner_id', id)
  }

}

module.exports = Owner

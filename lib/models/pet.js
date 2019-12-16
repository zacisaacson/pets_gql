const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

class Pet {
  static findPetOwners(owner_id) {
    return database('pets')
      .join('owners', {'pets.owner_id': 'owners.id'})
      .where('owners.id', owner_id)
      .first()
  }

  static findAllPets(){
    return database('pets')
      .select()
  }

  static findPet(id){
    return database('pets')
      .where('id', id)
      .first()
  }

  static addPet(pet_info){
    return database('pets')
    .returning('*')
    .insert({
      name: pet_info.name,
      age: pet_info.age,
      animal_type: pet_info.animal_type,
      breed: pet_info.breed,
      favorite_treat: pet_info.favorite_treat,
      owner_id: pet_info.owner_id
    })
  }
}

module.exports = Pet

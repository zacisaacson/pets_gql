

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pets').del()
    .then(() => knex('owners').del())
    .then(() => { return Promise.all([
      // Inserts seed entries
      knex('owners').insert([
        {name:'Charlie', age: 44, id: '1'},
        {name:'Miguel', age: 32, id: '2'},
        {name:'Leslie', age: 25, id: '3'}
      ]),

      knex('pets').insert([
        {
          id: 1,
          name: "Fluffy",
          animal_type: "cat",
          breed: "long-hair",
          age: 7,
          favorite_treat: "catnip",
          owner_id: 1
        },
        {
          id: 2,
          name: "Bubbles",
          animal_type: "dog",
          breed: "Boston Terrier",
          age: 3,
          favorite_treat: "blueberries",
          owner_id: 2
        },
        {
          id: 3,
          name: "Fiona",
          animal_type: "dog",
          breed: "Mini Australian Shepherd",
          age: 1,
          favorite_treat: "pepperoni",
          owner_id: 2
        },
        {
          id: 4,
          name: "Scooby",
          animal_type: "dog",
          breed: "Great Dane",
          age: 4,
          favorite_treat: "peanut butter",
          owner_id: 3
        },
        {
          id: 5,
          name: "Wiley",
          animal_type: "guinea pig",
          breed: "Teddy",
          age: 1,
          favorite_treat: "oranges",
          owner_id: 3
        },
      ])
    ])
  })
  .then(() => console.log('Seeding Complete!'))
  .catch(error => console.error(`Oops! Error seeding data: ${error}`));
};

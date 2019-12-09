const Pet = require('../models/pet')
const Owner = require('../models/owner')

const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    animal_type: {type: GraphQLString},
    breed: {type: GraphQLString},
    age: {type: GraphQLInt},
    favorite_treat: {type: GraphQLString},
    owner:{
      type: OwnerType,
      resolve(parent, args){
        return Pet.findPetOwners(parent.owner_id)
      }
    }
  })
})

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    pets: {
      type: GraphQLList(PetType),
      resolve(parent, args){
        return Owner.findOwnersPets(parent.id)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    pet: {
      type: PetType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Pet.findPet(args.id)
      }
    },
    pets: {
      type: new GraphQLList(PetType),
      resolve(parent, args){
        return Pet.findAllPets()
      }
    },
    owner: {
      type: OwnerType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Owner.findOwner(args.id)
      }
    },
    owners: {
      type: GraphQLList(OwnerType),
      resolve(parent, args){
        return Owner.findAllOwners()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})

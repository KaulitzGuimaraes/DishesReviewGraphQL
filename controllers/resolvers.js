import db from '../connectors/mongodb.js'

const resolvers = {
    Query: {
        async users() {
            // Fetch all dishes from the 'dish' collection
            const users = await db.connection.collection('user').find().toArray();
            return users  // Returning an array of dishes
        },
        async reviews() {
              // Fetch all dishes from the 'dish' collection
            const reviews = await db.connection.collection('review').find().toArray()
            return reviews // Returning an array of dishes
        },
        async dishes() {
            // Fetch all dishes from the 'dish' collection
            const dishes = await db.connection.collection('dish').find().toArray()
            return dishes // Returning an array of dishes

        },
        async user(_,args){
            console.log(new String(args.id))
            const user = await db.connection.collection('user').findOne({ _id: parseInt(args.id) }); // convert to number
            return user
        },
        async dish(_,args){
            const dish = await db.connection.collection('dish').findOne({ _id: parseInt(args.id) }); // convert to number
            return dish
        },
        async review(_,args){
            const review = await db.connection.collection('review').findOne({ _id: parseInt(args.id) }); // convert to number
            return review
        }
    },
    Review: {
         async user(parent){
            const user = await db.connection.collection('user').findOne({_id: parent.user_id}); // convert to number
            return user


        },
        async dish(parent){
            const dish = await db.connection.collection('dish').findOne({_id: parent.dish_id})
            return dish


        }

    }
        // user(id:ID!): User
        // dish(id:ID!): Dish
        // review(id:ID!): Review



}
export default resolvers
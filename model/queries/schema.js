const query = `#graphql
type Dish {
    _id: ID!
    name: String!
    photo: String!
    description: String!
    vegan: Boolean!
    vegetarian: Boolean!
    no_milk: Boolean!
    no_gluten: Boolean!

}
type User {
    name: String!
    _id: ID!
}
type Review {
    _id: ID!
    content: String!
    stars: Int!
    user: User!
    dish: Dish!
}

type Query  {
    users : [User]
    reviews: [Review]
    dishes: [Dish]
    user(id:ID!): User
    dish(id:ID!): Dish
    review(id:ID!): Review
}
`

 export default query

# **Apollo + MongoDB + GraphQL API

This project sets up an Apollo Server with MongoDB as the database, using GraphQL to query data about dishes, users, and reviews. This API allows you to manage and retrieve data such as dishes, users, and their associated reviews in a flexible and scalable way.

---

## **Table of Contents**

1. [Description](#description)
2. [Technologies](#technologies)
3. [Setup](#setup)
    - [1. Environment Variables](#environment-variables)
    - [2. MongoDB Setup](#mongodb-setup)
4. [GraphQL Schema](#graphql-schema)
5. [How to Use](#how-to-use)
    - [React](#react)
    - [Vue](#vue)
6. [License](#license)

---

## **Description**

This project implements a simple backend service using **Apollo Server** with **GraphQL** to interface with a **MongoDB** database. It provides the following functionality:

- Query for **dishes** and their associated details (e.g., name, description, dietary restrictions).
- Fetch **user** details.
- Get **reviews** for each dish, as well as the ratings and user who wrote them.

Perfect for integrating into any front-end project where you want a flexible and fast API.

---

## **Technologies**

- **Apollo Server** - A popular library for setting up GraphQL APIs.
- **MongoDB** - A NoSQL database that stores data in a flexible, JSON-like format.
- **GraphQL** - A query language for APIs, ideal for retrieving complex data from a server.
- **dotenv** - Loads environment variables from a `.env` file.
- **Express** - Optional for adding routing if needed (though not used in this example).

---

## **Setup**

To get started with this project, you'll need Node.js and MongoDB. Here's how to set everything up:

### 1. Environment Variables

Create a `.env` file at the root of the project and add the following:

```env
PORT=4000
MONGODB_URL=mongodb://localhost:27017/graphql
```

- `PORT` is the port your server will run on.
- `MONGODB_URL` is the connection string to your MongoDB instance.

### 2. MongoDB Setup

1. Install MongoDB on your machine, or use a cloud instance (e.g., MongoDB Atlas).
2. Create the following collections in MongoDB: `users`, `dishes`, and `reviews`.
3. Insert the sample data provided in the `README`.

```js
// Insert Users
db.user.insertMany([
  { _id: 1, name: "Alice" },
  { _id: 2, name: "Bob" },
  { _id: 3, name: "Charlie" },
  { _id: 4, name: "Diana" },
  { _id: 5, name: "Ethan" },
  { _id: 6, name: "Fiona" },
  { _id: 7, name: "George" }
]);

// Insert Dishes (example for one dish)
db.dish.insertMany([
  {
    _id: 1,
    name: "Vegan Burger",
    photo: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    description: "A delicious plant-based burger made with black beans and quinoa.",
    vegan: true,
    vegetarian: true,
    no_milk: true,
    no_gluten: false
  }
]);

// Insert Reviews (for the dishes)
db.review.insertMany([
  {
    _id: 1,
    content: "Absolutely fantastic, I'd order it again!",
    stars: 5,
    user_id: 1,
    dish_id: 1
  },
  {
    _id: 2,
    content: "Delicious and well seasoned.",
    stars: 4,
    user_id: 2,
    dish_id: 1
  }
]);
```

---

## **GraphQL Schema**

```graphql
#graphql
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

type Query {
  users: [User]
  reviews: [Review]
  dishes: [Dish]
  user(id: ID!): User
  dish(id: ID!): Dish
  review(id: ID!): Review
}
```

This schema defines three main types:

- **Dish**: Information about a dish, including dietary restrictions.
- **User**: Basic information about a user.
- **Review**: Reviews left by users for a dish.

---

## **How to Use**

You can use this GraphQL API in **React** or **Vue**. Below are examples of how to set up the GraphQL client for each.

### React

First, install `@apollo/client` and `graphql`:

```bash
npm install @apollo/client graphql
```

Then, use the Apollo Client to interact with your GraphQL API:

```js
import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',  // Your API URL
  cache: new InMemoryCache(),
});

const GET_DISHES = gql`
  query {
    dishes {
      _id
      name
      description
    }
  }
`;

const App = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    client
      .query({
        query: GET_DISHES,
      })
      .then((result) => setDishes(result.data.dishes))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Dishes</h1>
      <ul>
        {dishes.map((dish) => (
          <li key={dish._id}>{dish.name}: {dish.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

### Vue

For Vue, install the Apollo client:

```bash
npm install @apollo/client graphql
```

Then use Apollo in your Vue component:

```js
<template>
  <div>
    <h1>Dishes</h1>
    <ul>
      <li v-for="dish in dishes" :key="dish._id">
        {{ dish.name }}: {{ dish.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default {
  data() {
    return {
      dishes: [],
    };
  },
  created() {
    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',  // Your API URL
      cache: new InMemoryCache(),
    });

    const GET_DISHES = gql`
      query {
        dishes {
          _id
          name
          description
        }
      }
    `;

    client
      .query({ query: GET_DISHES })
      .then((result) => {
        this.dishes = result.data.dishes;
      })
      .catch((error) => console.error(error));
  },
};
</script>
```

---

## **License**

MIT License. See `LICENSE` for more information.

---

### Final Thoughts

With this, you now have a fully functional backend running **Apollo Server**, connected to **MongoDB**, and ready to be used in **React** or **Vue**! You can now interact with your GraphQL API to query dishes, users, and reviews.

---

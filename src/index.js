import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http'; //Client connects with this to endpoint
import { InMemoryCache } from 'apollo-cache-inmemory'; //Apollo cache utility
import { ApolloClient, gql } from 'apollo-boost'; //gql is from Apollo

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers'

//Link creation to the backend GraphQL server
const httpLink = createHttpLink({
	uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache(); // Apollo unitily manages data, an object for local storage

//Apollo client creation
// Cache is for local storage - replaces redux
const client = new ApolloClient({
	link: httpLink,
	cache,
	typeDefs,
	resolvers
});

// this is where the data gets put into the cache
// Initial state of the cache
client.writeData({
	data: {
		cartHidden: true,
		cartItems: [],
		itemCount: 0
	}
});

//Data request from GraphQL
// Apollo syntax for request
// Method that takes an object
//returns a Promise

client
	.query({
	//same structure of the key in the backend
	//this is declaration that it's a gql object
		query: gql` 
			{
				getCollectionsByTitle(title: "hats") {
					id
					title
					items {
						id
						name
						price
						imageUrl
					}
				}
			}`
	}).then(res => console.log(res));



ReactDOM.render(
	<ApolloProvider client={client}>
	  <Provider store={store}>
	    <BrowserRouter>
	      <PersistGate persistor={persistor}>
	        <App />
	      </PersistGate>
	    </BrowserRouter>
	  </Provider>
	</ApolloProvider>,
  document.getElementById('root')
);

import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount } from './cart.utils';


// Values to resolve from queries on the client side (Redux mimic)
//Type definition for the backend
//Type definitions should be capitalized
// This is the database schema ON THE CLIENT, ON THE FRONT END

// extend extends exisiting type
// Mutation is type of object that can be updated,
// defined below in the resolver
export const typeDefs = gql`
	extend type Item {
		quantity: Int
	}

	extend type Mutation {
		ToggleCartHidden: Boolean!
		AddItemToCart(item: Item!): [Item]!
	}
`;

///@client signals for local cache query, not backend
// this is the Queries on the client cache
const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`;

const GET_CART_ITEMS = gql`
	{
		cartItems @client
	}
`;

const GET_ITEM_COUNT = gql`
	{
		itemCount @client
	}
`;

//Actual GraphQL mutation object definition
// key represents a function
export const resolvers = {
	Mutation: {
		toggleCartHidden: (_root, _args, { cache }) => {
			const { cartHidden } = cache.readQuery({
				query: GET_CART_HIDDEN,
			});

			//This is the cache update
			cache.writeQuery({
				query: GET_CART_HIDDEN,
				data: { cartHidden: !cartHidden }
			});

			return !cartHidden;
		},

		addItemToCart: (_root, { item }, { cache }) => {
			const { cartItems } = cache.readQuery({
				query: GET_CART_ITEMS
			});

			const newCartItems = addItemToCart(cartItems, item);

			cache.writeQuery({
				query: GET_ITEM_COUNT,
				data: { itemCount: getCartItemCount(newCartItems)}
			});

			cache.writeQuery({
				query: GET_CART_ITEMS,
				data: { cartItems: newCartItems }
			});

			return newCartItems;
		}
	}
};





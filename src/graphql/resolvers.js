import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount } from './cart.utils';

//Type definition for the backend
//Type definitions should be capitalized
export const typeDefs = gql`
	extend type Item {
		quantity: Int
	}

	extend type Mutation {
		ToggleCartHidden: Boolean!
		AddItemToCart(item: Item!): [Item]!
	}
`;

//@client signals for local cache query, not backend
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





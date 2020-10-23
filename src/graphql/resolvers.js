import { gql } from 'apollo-boost';

//Type definition for the backend
//Type definitions should be capitalized
export const typeDefs = gql`
	extend type Mutation {
		ToggleCartHidden: Boolean!
	}
`;

//@client signals for local cache query, not backend
const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`

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
		}
	}
}





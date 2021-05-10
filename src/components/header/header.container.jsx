import React from 'react';

// Usual GraphQL imports
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './header.component';

// query on the client declaration
const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`;

const HeaderContainer = () => (
	<Query query={GET_CART_HIDDEN}>
	{
		// this is the function off of the GQL query
		({data: { cartHidden }}) => <Header hidden={cartHidden} />
	}

	</Query>
)

export default HeaderContainer;



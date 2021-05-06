import React from 'react';
import { Query } from 'react-apollo'; // Graphql component
import { gql } from 'apollo-boost'; // you need this format to request GraphQl data

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

// This is the GraphQL container

//Using the Query component
// data is returned back as a function that has access to the data
// like a Consumer

const GET_COLLECTIONS = gql`
	{
		collections {
			id
			title
			items {
				id
				name
				price
				imageUrl
			}
		}
	}
`;

// This is the new component that returns the Query component
// that wraps the actual data
// this is where the function is returned

const CollectionsOverviewContainer = () => (
	<Query query={GET_COLLECTIONS}>
	{
		({ loading, data }) => {

			if (loading) return <Spinner />;
			return <CollectionsOverview
						collections={data.collections} />

		}
	}
	</Query>
);

export default CollectionsOverviewContainer;



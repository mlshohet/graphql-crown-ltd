import React from 'react';

// these are all components needed for GraphQl Apollo functinality
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './collection.component';

//always import a loading component for fetching gql
import Spinner from '../../components/spinner/spinner.component';


//this is dynamic querying:
// you have to specify the field and the type

const GET_COLLECTION_BY_TITLE = gql`
	query getCollectionsByTitle($title: String!) {
		getCollectionsByTitle(title: $title) {
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
`

// get the match out of the props: 
//**** You have to pass variables into Query!!! ****
const CollectionPageContainer = ({ match }) => 
	{
		console.log("Match: ", match);
	 return (

		<Query
			query={GET_COLLECTION_BY_TITLE}
			variables={{ title: match.params.collectionId }}
		>
			{({ loading, data }) => {
					console.log("Data from Collection Container ", data);
					if (loading) return <Spinner />;
					const { getCollectionsByTitle } = data;
					return <CollectionPage collection={getCollectionsByTitle} />;
			}}
		</Query>

	);
}
export default CollectionPageContainer;



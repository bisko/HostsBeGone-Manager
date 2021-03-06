import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EntryList from '../../common/entry-list/list';
import {
	getStaticEntriesList
} from '../../../state/server/static-entries-list/selectors';

class StaticEntriesList extends React.Component {
	componentWillMount = () => {
		this.context.socketComm.dispatch(
			'config:getStaticEntriesList',
		);
	};

	addAction = ( formData ) => {
		this.context.socketComm.dispatch(
			'config:addStaticEntry',
			{
				entry: {
					host: formData.host,
					destination: formData.destination,
					type: formData.type,
					ttl: formData.ttl,
				}
			}
		);
	};

	deleteAction = ( host, type ) => {
		this.context.socketComm.dispatch(
			'config:deleteStaticEntry',
			{ host, type }
		);
	};

	convertStaticEntriesListToEntryList( entriesList ) {
		return entriesList.map( ( entry ) => {
			return {
				...entry,
				id: Math.random(),
				groupLabel: entry.host.split( '.' ).slice(-2).join('.')
			};
		} );
	}

	render = () => {
		return (
			<EntryList
				items={ this.convertStaticEntriesListToEntryList( this.props.getStaticEntriesList ) }
				addAction={ this.addAction }
				deleteAction={ this.deleteAction }
				updateAction={ null }
				detailedInformation={ true }
				schema={ StaticEntriesList.schema }
				sortBy={ [ 'host', 'type' ] }
				groupBy="groupLabel"
			/>
		);
	};
}

StaticEntriesList.contextTypes = {
	socketComm: PropTypes.object,
};

StaticEntriesList.schema = {
	title: 'Add a new static entry',
	type: 'object',
	required: [ 'host', 'type', 'destination' ],
	properties: {
		host: { type: 'string', title: 'Host' },
		type: {
			type: 'string',
			title: 'Entry type',
			'default': 'A',
			'enum': [
				'A', 'AAAA',
			]
		},
		destination: { type: 'string', title: 'Destination' },
		ttl: { type: 'integer', title: 'TTL', 'default': 2 },
	}
};

export default connect(
	( state ) => {
		return {
			getStaticEntriesList: getStaticEntriesList( state ),
		};
	}
)( StaticEntriesList );

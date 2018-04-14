/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";


/**
 * Internal dependencies
 */
import EntryList from '../../common/entry-list/list';
import { getDnsCacheList } from "../../../state/server/dns-cache-list/selectors";
import { getServerCacheSize, getServerConnectionStatus } from "../../../state/server/status/selectors";

class DnsCacheList extends Component {
	static contextTypes = {
		socketComm: PropTypes.object
	};

	static schema = {
		title: 'DNS Cache list',
		type: 'object',
		required: [],
		properties: {
			address: { type: 'string', title: 'Host' },
			type: {
				type: 'string',
				title: 'Type',
				'default': 'A',
				'enum': [
					'A', 'AAAA',
				]
			},
			name: { type: 'string', title: 'Host' },
			ttl: { type: 'integer', title: 'TTL', 'default': 2 },
		}
	};

	componentWillMount() {
		this.context.socketComm.dispatch(
			'server:getCacheList',
		);
	}

	componentWillReceiveProps = ( nextProps ) => {
		if ( nextProps.cacheSize !== this.props.cacheSize ) {
			// renew the list
			if ( this.props.serverConnected ) {
				this.context.socketComm.dispatch(
					'server:getCacheList',
				);
			}
		}
	};

	// TODO proper TYPE mapping
	convertListForRendering( entries ) {
		return entries.filter( ( entry ) => ( entry.type === 1 ) ).map( ( entry ) => ( {
			...entry,
			id: Math.random(),
			groupLabel: entry.name.split('.').slice(-2).join('.'),
		} ) );
	}

	render() {
		return (
			<EntryList
				items={this.convertListForRendering( this.props.cacheList )}
				detailedInformation={true}
				schema={DnsCacheList.schema}
				sortBy={[ 'name', 'type' ]}
				groupBy="groupLabel"
			/>
		);
	}
}

export default connect( ( state ) => ( {
	serverConnected: getServerConnectionStatus( state ) ? 'CONNECTED' : 'NOT CONNECTED',
	cacheSize: getServerCacheSize( state ),
	cacheList: getDnsCacheList( state ),
} ), null )( DnsCacheList );

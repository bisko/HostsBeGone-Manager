import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EntryList from '../../common/entry-list/list';
import {
	getDNSServersList,
} from '../../../state/server/dns-servers-list/selectors';

import {
	addDNSServer,
	updateDNSServer,
	removeDNSServer,
} from '../../../state/server/dns-servers-list/actions';

class DnsServerList extends Component {
	static contextTypes = {
		socketComm: PropTypes.object,
	};

	static schema = {
		title: 'Add a new DNS server',
		type: 'object',
		required: [ 'host' ],
		properties: {
			host: { type: 'string', title: 'Server IP', 'default': '1.2.3.4' },
			permanent: { type: 'boolean', title: 'Permanent', 'default': false },
		}
	};

	componentWillMount = () => {
		this.context.socketComm.dispatch(
			'config:getDNSServersList',
		);
	};

	convertServerListToEntryList( serverList ) {
		return serverList.map( ( entry ) => {
			return {
				id: entry.id,
				host: entry.address,
				permanent: entry.options.permanent === false ? 'NO' : 'YES',
			};
		} );
	}

	addAction = ( newValue ) => {
		this.context.socketComm.dispatch(
			'config:addDNSServer',
			{
				server: {
					address: newValue,
					options: {}
				}
			}
		);

		return true;
	};

	deleteAction = ( id ) => {
		this.context.socketComm.dispatch(
			'config:deleteDNSServer',
			{ serverId: id }
		);
	};

	render = () => {
		return (
			<EntryList
				items={this.convertServerListToEntryList( this.props.getDNSServersList )}
				addAction={this.addAction}
				deleteAction={this.deleteAction}
				updateAction={null}
				detailedInformation={true}
				schema={DnsServerList.schema}
				groupBy="host"
			/>
		);
	};
}

export default connect(
	( state ) => ( {
		getDNSServersList: getDNSServersList( state ),
	} ),
	( dispatch ) => (
		bindActionCreators( {
			addDNSServer,
			removeDNSServer,
			updateDNSServer,
		}, dispatch )
	)
)
( DnsServerList );

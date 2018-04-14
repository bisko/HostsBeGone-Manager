/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

/**
 * Internal dependencies
 */
import SocketConnection from '../../components/socket-connection';
import ServerStatus from '../../components/server-status';
import ElectronCommunication from '../../components/electron-communication';
import DnsServerList from '../../components/server-configuration/dns-server-list';
import StaticEntriesList from '../../components/server-configuration/static-entries-list';
import StaticEntriesStatus from '../../components/static-entries-status';
import DnsServerRestartButton from '../../components/server-configuration/dns-server-restart-button';
import DnsServerFlushCacheButton from '../../components/server-configuration/dns-server-flush-cache';
import ServerPoller from '../../components/server-poller';
import DnsCacheList from '../../components/server-configuration/dns-cache-list';

import { getServerConnectionStatus, getServerCacheSize } from '../../state/server/status/selectors';

import './style.css';

class ServerConfiguration extends React.Component {
	constructor() {
		super();

		this.state = {
			activeComponent: 'serverList'
		};
	}

	getActiveComponent = () => {
		switch ( this.state.activeComponent ) {
			case 'serverList':
				return (
					<DnsServerList/>
				);
			case 'cacheList':
				return ( <DnsCacheList/> );
			default:
				return (
					<StaticEntriesList/>
				);
		}
	};

	setActiveComponent( component ) {
		this.setState( {
			activeComponent: component
		} );
	}

	getStaticEntriesButton = () => {
		if ( ! this.props.serverRunning ) {
			return null;
		}

		return (
			<StaticEntriesStatus/>
		);
	};

	getServerConfigurationManager = () => {
		if ( ! this.props.serverRunning ) {
			return null;
		}

		return (
			<div>
				<div className="server-configuration__chooser">
					<button
						className={cx(
							'server-configuration-chooser__button',
							{ active: this.state.activeComponent === 'serverList' }
						)}
						onClick={() => {
							this.setActiveComponent( 'serverList' );
						}}
					>
						Servers list
					</button>
					<button
						className={cx(
							'server-configuration-chooser__button',
							{ active: this.state.activeComponent === 'staticEntries' }
						)}
						onClick={() => {
							this.setActiveComponent( 'staticEntries' );
						}}
					>
						Static entries list
					</button>
					<button
						className={cx(
							'server-configuration-chooser__button',
							{ active: this.state.activeComponent === 'cacheList' }
						)}
						onClick={() => {
							this.setActiveComponent( 'cacheList' );
						}}
					>
						Cache ({this.props.cacheSize})
					</button>
				</div>
				{this.getActiveComponent()}
			</div>
		);
	};

	render = () => {
		return (
			<div>
				<p> Welcome to HostsBeGone configuration! </p>
				<SocketConnection>
					<div className="statusComponents">
						<ElectronCommunication/>
						<ServerPoller/>
						<ServerStatus/>
						<DnsServerRestartButton
							serverRunning={this.props.serverRunning}
						/>
						<DnsServerFlushCacheButton
							serverRunning={this.props.serverRunning}
						/>
						{this.getStaticEntriesButton()}
					</div>
					{this.getServerConfigurationManager()}
				</SocketConnection>
			</div>
		);
	};
}

ServerConfiguration.propTypes = {
	serverRunning: PropTypes.bool,
	cacheSize: PropTypes.number,
};

ServerConfiguration.contextTypes = {
	store: PropTypes.object,
};

export default connect(
	( state ) => {
		return {
			serverRunning: getServerConnectionStatus( state ),
			cacheSize: getServerCacheSize( state ),
		};
	}, null
)( ServerConfiguration );

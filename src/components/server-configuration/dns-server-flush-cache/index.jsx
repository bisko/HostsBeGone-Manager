/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class DnsServerFlushCache extends Component {
	static propTypes = {
		serverRunning: PropTypes.bool.isRequired,
	};

	static contextTypes = {
		socketComm: PropTypes.object,
	};


	getButtonText = () => {
		if ( this.props.serverRunning ) {
			return 'Flush DNS cache';
		}

		return 'Waiting for server...';
	};

	flushCache = () => {
		if ( this.props.serverRunning ) {
			this.context.socketComm.dispatch(
				'server:flushCache',
			);
		}
	};

	render = () => {
		return (
			<button
				className="dns-server-restart-button"
				onClick={this.flushCache}
			>
				{this.getButtonText()}
			</button>
		);
	};
}

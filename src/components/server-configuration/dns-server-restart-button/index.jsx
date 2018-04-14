/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class DnsServerRestartButton extends React.Component {
	static propTypes = {
		serverRunning: PropTypes.bool.isRequired,
	};

	static contextTypes = {
		socketComm: PropTypes.object,
	};


	getButtonText = () => {
		if ( this.props.serverRunning ) {
			return 'Restart DNS server';
		}

		return 'Waiting for server...';
	};

	restartServer = () => {
		if ( this.props.serverRunning ) {
			this.context.socketComm.dispatch(
				'server:restart',
			);
		}
	};

	render = () => {
		return (
			<button
				className="dns-server-restart-button"
				onClick={this.restartServer}
			>
				{this.getButtonText()}
			</button>
		);
	};
}

export default DnsServerRestartButton;

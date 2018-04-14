/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

/**
 * Internal dependencies
 */
import { getServerConnectionStatus } from '../../state/server/status/selectors';

import './style.css';

class ServerStatus extends Component {
	static contextTypes = {
		store: PropTypes.object
	};

	render() {
		return (
			<div
				className={cx(
					'server_status__container',
					{
						connected: this.props.serverConnected === 'CONNECTED',
						disconnected: this.props.serverConnected !== 'CONNECTED'
					}
				)}
			>
				Server status: {this.props.serverConnected}
			</div>
		);
	}
}

export default connect(
	( state ) => {
		return {
			serverConnected: getServerConnectionStatus( state ) ? 'CONNECTED' : 'NOT CONNECTED',
		};
	},
	() => {
		return {};
	},
)( ServerStatus );

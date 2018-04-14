/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getServerConnectionStatus } from "../../state/server/status/selectors";

/**
 * Internal dependencies
 */

class ServerStatus extends Component {
	static contextTypes = {
		store: PropTypes.object,
		socketComm: PropTypes.object,
	};

	componentWillMount() {
		this.cacheSizeTimer = setInterval( () => {
			if ( this.props.serverConnected ) {
				this.context.socketComm.dispatch(
					'server:getCacheSize',
				);
			}
		}, 500 );
	}

	componentWillUnmount() {
		// TODO cancel timer ...
	}

	render() {
		return null;
	}
}

export default connect(
	( state ) => ( {
		serverConnected: getServerConnectionStatus( state ) ? 'CONNECTED' : 'NOT CONNECTED',
	} ),
	null
)( ServerStatus );

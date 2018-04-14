/**
 * External Dependencies
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isElectron from 'is-electron';
import { getServerConnectionStatus } from "../../state/server/status/selectors";
import { getStaticEntriesStatus } from "../../state/server/static-entries-status/selectors";

class ElectronCommunication extends Component {
	static contextTypes = {
		store: PropTypes.object,
		socketComm: PropTypes.object,
	};

	commInstance = null;
	state = { ipc: false };

	componentWillMount() {
		if ( isElectron() ) {
			this.commInstance = window.ipcRenderer;
			this.setState( { ipc: true } );

			this.attachEvents();
			this.sendInitialState();
		}
	}

	// TODO update to React 16 syntax
	componentWillReceiveProps( nextProps ) {
		if ( nextProps.serverRunning !== this.props.serverRunning ) {
			this.commInstance.send( 'server-running-state', nextProps.serverRunning );
		}

		if ( nextProps.serverRunning && nextProps.entriesEnabled !== this.props.entriesEnabled ) {
			this.commInstance.send( 'server-static-entries-state', nextProps.entriesEnabled );
		}
	};

	attachEvents = () => {
		/**
		 * Browser events that send data to Electron
		 */

		const sendOnlineStatus = () => {
			const status = navigator.onLine ? 'online' : 'offline';
			this.commInstance.send( 'online-status-changed', status );
			this.context.socketComm.dispatch( 'server:onlineStatusChanged', status );
		};
		window.addEventListener( 'online', sendOnlineStatus );
		window.addEventListener( 'offline', sendOnlineStatus );

		/**
		 * Electron events to browser
		 */
		this.commInstance.on( 'toggle-static-entries', () => {
			if ( this.props.entriesEnabled ) {
				this.context.socketComm.dispatch(
					'config:disableStaticEntries',
				);
			} else {
				this.context.socketComm.dispatch(
					'config:enableStaticEntries',
				);
			}
		} );
	};

	sendInitialState = () => {
		this.commInstance.send( 'server-static-entries-state', this.props.entriesEnabled );
		this.commInstance.send( 'server-running-state', this.props.serverRunning );
	};

	render() {
		return null;
	}
}

export default connect( ( state ) => ( {
	serverRunning: getServerConnectionStatus( state ),
	entriesEnabled: getStaticEntriesStatus( state ),
} ), null )( ElectronCommunication );

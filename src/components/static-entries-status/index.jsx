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
import { getStaticEntriesStatus } from '../../state/server/static-entries-status/selectors';

import './style.css';

class StaticEntriesStatus extends React.Component {
	static contextTypes = {
		socketComm: PropTypes.object,
	};

	componentWillMount = () => {
		this.context.socketComm.dispatch(
			'config:getStaticEntriesStatus',
		);
	};

	toggleStaticEntriesStatus = () => {
		if ( this.props.entriesEnabled ) {
			this.context.socketComm.dispatch(
				'config:disableStaticEntries',
			);
		} else {
			this.context.socketComm.dispatch(
				'config:enableStaticEntries',
			);
		}
	};

	render = () => {
		return (
			<div
				className={cx(
					'static-entries-status__container',
					{
						enabled: this.props.entriesEnabled === true,
						disabled: this.props.entriesEnabled === false
					}
				)}
				onClick={this.toggleStaticEntriesStatus}
			>
				Static entries: {this.props.entriesEnabled ? 'ENABLED' : 'DISABLED'}
			</div>
		);
	};
}

export default connect(
	( state ) => {
		return {
			entriesEnabled: getStaticEntriesStatus( state ),
		};
	},
	() => {
		return {};
	},
)( StaticEntriesStatus );

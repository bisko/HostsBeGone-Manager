import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

class EntryListEntry extends Component {
	static propTypes = {
		entry: PropTypes.object.isRequired,
		deleteAction: PropTypes.func,
		updateAction: PropTypes.func,
		groupTitle: PropTypes.string,
		isFirstEntryInGroup: PropTypes.bool,
		groupIdx: PropTypes.number,
	};

	deleteEntry = () => {
		this.props.deleteAction( this.props.entry.host, this.props.entry.type );
	};

	getDetailedInformation() {
		if ( this.props.schema && this.props.schema.properties ) {
			return (
				Object.keys( this.props.schema.properties ).map( ( prop ) => {
					return (
						<td className="entry-list-entry__properties-entry-value" key={prop}>
							{this.props.entry[ prop ]}
						</td>
					);
				} )
			);
		}
	}

	render = () => {
		const trClass = classNames({
			even: this.props.groupIdx % 2 === 0,
			odd: this.props.groupIdx % 2 !== 0,
		});
		return (
			<tr className={trClass}>
				<td>{this.props.isFirstEntryInGroup && this.props.groupTitle}</td>
				{this.getDetailedInformation()}
				{this.props.deleteAction && (
					<td>
						<button
							className="entry-list-entry__action-delete"
							onClick={this.deleteEntry}
						>
							Delete
						</button>
					</td>
				)}
			</tr>
		);
	}
}

export default connect(
	null,
	null
)( EntryListEntry );

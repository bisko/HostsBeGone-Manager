import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EntryListEntry from './entry';
import EntryListAddEntry from './entry-add';

import './style.css';

class EntryList extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		deleteAction: PropTypes.func,
		updateAction: PropTypes.func,
		addAction: PropTypes.func,
		detailedInformation: PropTypes.bool,
		schema: PropTypes.object.isRequired,
		sortBy: PropTypes.array,
		groupBy: PropTypes.string
	};

	sort( items ) {
		const updatedItems = [ ...items ];

		if ( this.props.sortBy ) {
			updatedItems.sort( ( a, b ) => {
				for ( let i = 0; i < this.props.sortBy.length; i ++ ) {
					const key = this.props.sortBy[ i ];
					if ( a[ key ] < b[ key ] ) {
						return - 1;
					} else if ( a[ key ] > b[ key ] ) {
						return 1;
					}
				}

				return 0;
			} );
		}

		return updatedItems;
	}

	group( items ) {
		const result = [];

		items.forEach( ( item ) => {
			if ( ! result[ item[ this.props.groupBy ] ] ) {
				result[ item[ this.props.groupBy ] ] = [];
			}

			result[ item[ this.props.groupBy ] ].push( { ...item, group_title: item[ this.props.groupBy ] } );
		} );

		return result;
	}

	getEntryItem( entry, isFirstEntryInGroup = false, groupIdx = 0 ) {
		console.log(groupIdx);
		return (
			<EntryListEntry
				key={entry.id}
				entry={entry}
				deleteAction={this.props.deleteAction}
				updateAction={this.props.updateAction}
				schema={this.props.detailedInformation ? this.props.schema : null}
				groupTitle={entry.group_title}
				isFirstEntryInGroup={isFirstEntryInGroup}
				groupIdx={groupIdx}
			/>
		);
	}

	getGroupedItems( itemsList ) {
		const groupedItems = this.group( itemsList );

		return (
			<table>
				<thead>
				<tr>
					<th></th>
					{
						Object.keys( this.props.schema.properties ).map( ( prop ) => {
							return (
								<th key={prop}>
									{this.props.schema.properties[ prop ].title}
								</th>
							);
						} )
					}
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{
					Object.keys( groupedItems ).map( ( itemGroup, groupIdx ) => (
						groupedItems[ itemGroup ].map( ( groupItem, itemIdx ) => (
							this.getEntryItem( groupItem, itemIdx === 0, groupIdx )
						) )
					) )
				}
				</tbody>
			</table> );
	}


	render = () => {
		const itemsList = this.sort( this.props.items );

		return (
			<div className="entry-list">
				{this.getGroupedItems( itemsList )}
				{this.props.addAction && (
					<EntryListAddEntry
						addAction={this.props.addAction}
						schema={this.props.schema}
					/>
				)}
			</div>
		);
	}
}

export default connect(
	null,
	null
)( EntryList );

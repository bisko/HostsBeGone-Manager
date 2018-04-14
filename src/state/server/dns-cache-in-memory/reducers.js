import { flatten } from 'lodash';

export default ( state = [], action ) => {
	switch ( action.type ) {
		case 'SERVER_CACHE_LIST_START':
			return [];
		case 'SERVER_CACHE_LIST_ENTRY':
			let result = [];
			Object.keys( action.data ).forEach( ( entryType ) => {
				result = [ ...result, ...action.data[ entryType ] ];
			} );

			return [
				...state,
				...result,
			];

		default:
			return state;
	}
};

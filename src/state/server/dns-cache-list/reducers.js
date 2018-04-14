export default ( state = [], action ) => {
	switch ( action.type ) {
		case 'SERVER_CACHE_LIST_END':
			const entries = action.data;
			return [
				...entries
			];

		default:
			return state;
	}
};

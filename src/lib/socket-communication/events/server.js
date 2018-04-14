export default {
	updateCounter( socket, message ) {
		this.reduxStore.dispatch( {
			type: 'SERVER_UPDATE_COUNTER',
			data: message
		} );
	},

	cacheSize( socket, message ) {
		this.reduxStore.dispatch( {
			type: 'SERVER_CACHE_SIZE',
			data: message
		} );
	},

	cacheListStart( socket, message ) {
		this.reduxStore.dispatch( {
			type: 'SERVER_CACHE_LIST_START',
			data: message
		} );
	},

	cacheListEntry( socket, message ) {
		this.reduxStore.dispatch( {
			type: 'SERVER_CACHE_LIST_ENTRY',
			data: message
		} );
	},

	cacheListEnd( socket, message ) {
		this.reduxStore.dispatch( {
			type: 'SERVER_CACHE_LIST_END',
			data: this.reduxStore.getState().server.dnsCacheInMemory
		} );
	},
};

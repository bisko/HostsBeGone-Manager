export function getServerConnectionStatus( state ) {
	return ! ! state.server.status.connection_status;
}

export function getServerCacheSize( state ) {
	return state.server.status.cache_size ? parseInt( state.server.status.cache_size, 10 ) : 0;
}

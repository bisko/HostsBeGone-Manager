import { get } from 'lodash';

export function getDnsCacheList( state ) {
	return get( state, 'server.dnsCacheList', [] );
}
